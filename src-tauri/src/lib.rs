extern crate pnet;
extern crate chrono;

use pnet::datalink;
use std::{fs, path};
use serde::{Serialize};


// get wifi ip
pub fn get_wifi_ip() -> String {
    let is_mac = cfg!(target_os = "macos");
    let is_windows = cfg!(target_os = "windows");
    let is_linux = cfg!(target_os = "linux");

    for iface in datalink::interfaces() {
        // if is_mac and iface.name contains "en"
        if is_mac && iface.name.contains("en") && iface.is_up() && iface.ips.len() > 0 {
            // parse through the ips and find IpAddr::V4
            for ip in iface.ips {
                if ip.is_ipv4() {
                    // return the ip
                    return ip.ip().to_string();
                }
            }
        }
    }
    return "".to_string();
}


#[derive(Serialize)]
pub struct FileResponse {
    name: String,
    path: String,
    size: u64,
    added_at: String,
}

fn strftime(time: std::time::SystemTime, format: &str) -> String {
    let datetime = chrono::DateTime::<chrono::Local>::from(time);
    datetime.format(format).to_string()
}

// encrypt/decrypt file using XOR and a secret key
pub fn crypt_file(file_path: &path::PathBuf, key: &str) -> Result<FileResponse, String> {
    // read file contents
    let contents = fs::read(&file_path);
    let contents = match contents {
        Ok(contents) => contents,
        Err(_) => return Err("Unable to read file".to_string()),
    };
    // encrypt file
    let output = contents.iter()
        .enumerate()
        .map(|(i, val)| val ^ key.chars().nth(i % key.len()).unwrap() as u8)
        .collect::<Vec<_>>();
    // write encrypted file
    fs::write(file_path, output).expect("Unable to write file");
    let file = FileResponse {
        name: file_path.file_name().unwrap().to_str().unwrap().to_string(),
        path: file_path.to_str().unwrap().to_string(),
        size: file_path.metadata().unwrap().len(),
        added_at: strftime(file_path.metadata().unwrap().created().unwrap(), "%Y-%m-%d %H:%M:%S").to_string(),
    };
    // rename file and add .enc extension if not already there else if already there remove .enc extension
    let file_name = file_path.file_name().unwrap().to_str().unwrap().to_string();
    let file_name = if file_name.contains(".enc") {
        file_name.replace(".enc", "")
    } else {
        format!("{}.enc", file_name)
    };
    let new_file_path = file_path.with_file_name(file_name);
    fs::rename(file_path, new_file_path).expect("Unable to rename file");    
    Ok(file)
}

// walk directory and encrypt files
// fn walk_dir(dir_path: &path::PathBuf, key: &str) -> Result<(), Error> {
//     // read directory
//     let paths = fs::read_dir(dir_path).expect("Unable to read directory");
//     // iterate through files
//     for path in paths {
//         let file_path = path.unwrap().path();
//         // if file is a directory, walk it
//         if file_path.is_dir() {
//             walk_dir(&file_path, key)?;
//         } else {
//             crypt_file(&file_path, key)?;
//         }
//     }
//     Ok(())
// }

// run encrypt process
// pub fn run_operation(file_path: &str, key: &str) -> Result<(), Error> {
//     // metadata
//     let meta = fs::metadata(file_path).expect("Unable to get file metadata");
//     let path_to_file = path::PathBuf::from(file_path);
//     // check if file is a directory
//     if meta.is_dir() {
//         // walk directory and encrypt files
//         walk_dir(&path_to_file, key)?;
//     } else {
//         // encrypt file
//         crypt_file(&path_to_file, key)?;
//     }
//     Ok(())
// }