import { createSignal, For, onCleanup, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import QRModal from "./components/QRModal";
import { Header } from "./components/Header";
import { DragAndDrop } from "./components/DragAndDrop";
import { FilesContainer } from "./components/FilesContainer";

interface FileStruct {
  name: string;
  path: string;
  size: number;
}

interface FileResponse extends FileStruct {
  added_at: string;
}

export interface File extends FileStruct {
  addedAt: Date;
}

function App() {
  const [modal, setModal] = createSignal(true);
  const [isDragging, setIsDragging] = createSignal(false);
  const [files, setFiles] = createStore([] as File[]);

  let unlisten = listen("tauri://file-drop", async (event) => {
    setIsDragging(false);
    (event.payload as []).forEach(async (path: string) => {
      invoke("encrypt_file", { filePath: path }).then((response) => {
        let fileResponse = response as FileResponse;
        // name contains .enc extension, remove it from files
        if (path.endsWith(".enc")) {
          const nameWithoutEnc = fileResponse.name.replace(".enc", "");
          setFiles((files) => files.filter((file) => file.name !== nameWithoutEnc));
          return;
        }
        let file: File = {
          name: fileResponse.name,
          path: fileResponse.path,
          size: fileResponse.size,
          addedAt: new Date(fileResponse.added_at),
        };
        setFiles((files) => [...files, file]);
        // sort files by addedAt
        setFiles((files) => [...files].sort((a, b) => a.addedAt.getTime() - b.addedAt.getTime()));
      }).catch((err) => {
        console.log(err);
      });
    });
  });

  onCleanup(() => {
    unlisten.then((f) => {
      f();
    });
  });

  async function setup() {
    // add file
    setFiles((files) => [
      ...files,
      {
        name: "blob-sun.gif",
        path: "/Users/dunstorm/Downloads/blob-sun.gif",
        size: 65213,
        addedAt: new Date(),
      },
    ]);
  }

  // setup();

  // when not drag over event, set isDragging to false
  // when drag over event, set isDragging to true
  let dragEventTimeout: NodeJS.Timeout;

  async function handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    clearTimeout(dragEventTimeout);

    dragEventTimeout = setTimeout(() => {
      setIsDragging(false);
    }, 100);
  }

  return (
    <div
      onDragOver={(e) => handleDragOver(e)}
      class={`flex flex-col p-4 h-screen overflow-y-hidden ${isDragging() && "border border-dashed filter blur-sm"}`}
    >
      <Header modal={modal()} />
      <DragAndDrop files={files} />
      <FilesContainer files={files} />
      <Show when={modal()}>
        <QRModal hideModal={() => setModal(false)}/>
      </Show>
    </div>
  );
}

export default App;
