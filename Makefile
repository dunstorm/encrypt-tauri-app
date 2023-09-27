sync:
	rsync -Pauv --exclude="node_modules" --exclude="src-tauri/target" dunstorm@192.168.29.94:/home/dunstorm/Projects/encrypt-tauri-app/* ./

transfer:
	rsync -Pauv --exclude="node_modules" --exclude="src-tauri/target" ./  dunstorm@192.168.29.94:/home/dunstorm/Projects/encrypt-tauri-app