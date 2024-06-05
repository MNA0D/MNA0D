use auto_launch::AutoLaunch;

fn main() {
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

    println!("Hello, world!");
}
