use actix_files::NamedFile;
use actix_web::{web, App, HttpResponse, HttpServer, Result};
use std::io;
use std::path::PathBuf;
use std::process::Command;
use std::sync::Mutex;

struct AppState {
    screenshot_file: Mutex<String>,
}

async fn index() -> Result<HttpResponse> {
    Ok(HttpResponse::Ok()
        .content_type("text/html")
        .body(include_str!("../static/index.html")))
}

async fn screenshot() -> Result<HttpResponse> {
    // Take the screenshot and save it to a file
    let output_file = "screenshot.png";
    let linux_tools = [
        ("scrot", format!("scrot {}", output_file)),
        ("spectacle", format!("spectacle -b -o {}", output_file)),
        ("import", format!("import -window root {}", output_file)), // part of ImageMagick
        ("maim", format!("maim {}", output_file)),
        ("xwd", format!("xwd -root | convert xwd:- {}", output_file)), // requires ImageMagick
    ];

    let windows_tools = [("nircmd", format!("nircmd savescreenshot {}", output_file))];

    let tools = if cfg!(target_os = "linux") {
        linux_tools.iter()
    } else if cfg!(target_os = "windows") {
        windows_tools.iter()
    } else {
        panic!("Unsupported OS");
    };

    let mut screenshot_taken = false;

    for (tool, cmd) in tools {
        if Command::new(tool).output().is_ok() {
            let output = Command::new("sh")
                .arg("-c")
                .arg(cmd)
                .output()
                .expect("Failed to execute screenshot command");

            if output.status.success() {
                screenshot_taken = true;
                break;
            }
        }
    }

    if !screenshot_taken {
        return Ok(HttpResponse::InternalServerError().body("Failed to take screenshot"));
    }

    Ok(HttpResponse::Ok()
        .content_type("text/html")
        .body(include_str!("../static/screenshot.html")))
}

async fn get_screenshot() -> Result<NamedFile> {
    let path: PathBuf = "screenshot.png".parse().unwrap();
    Ok(NamedFile::open(path)?)
}

async fn camera() -> Result<HttpResponse> {
    Ok(HttpResponse::Ok()
        .content_type("text/html")
        .body(include_str!("../static/camera.html")))
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    let app_state = web::Data::new(AppState {
        screenshot_file: Mutex::new(String::from("screenshot.png")),
    });

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .route("/", web::get().to(index))
            .route("/screenshot", web::get().to(screenshot))
            .route("/get_screenshot", web::get().to(get_screenshot))
            .route("/camera", web::get().to(camera))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
