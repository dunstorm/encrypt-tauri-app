#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use encrypt_tauri_app::{FileResponse};
use std::{path};

#[tauri::command]
fn start_setup() -> String {
    // Check connected wifi
    let wifi_ip = encrypt_tauri_app::get_wifi_ip();
    return wifi_ip;
}

#[tauri::command]
fn encrypt_file(file_path: &str) -> Result<FileResponse, String>{
    println!("Processing file: {}", file_path);
    // Encrypt file
    let key = "secret";
    let file_to_path = path::PathBuf::from(file_path);
    let file = encrypt_tauri_app::crypt_file(&file_to_path, key)?;
    Ok(file)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start_setup, encrypt_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
