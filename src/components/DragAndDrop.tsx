import type { Component } from "solid-js";
import { File } from "../App";

interface DragAndDropProps {
  files: File[];
}

export const DragAndDrop: Component<DragAndDropProps> = ({ files }) => {
  return (
    <section class="flex flex-col justify-center items-center border p-4 mt-4 rounded-xl bg-gray-100">
      <svg
        class="mb-2 w-6 h-6 text-gray-400 text-sm"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      <div>
        {files.length === 0 ? "No" : files.length} file{files.length > 1 && "s"}{" "}
        found
      </div>
      <div class="text-gray-400 text-sm">Drag and drop to add {files.length > 0 && "more"} files</div>
    </section>
  );
};
