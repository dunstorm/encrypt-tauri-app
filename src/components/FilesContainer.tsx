import { Component, For } from "solid-js";
import { File } from "../App";

interface FilesContainerProps {
  files: File[];
}

export const FilesContainer: Component<FilesContainerProps> = ({ files }) => {
  return (
    <section class="flex flex-col mt-4 overflow-y-auto">
      <div class="flex items-center text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="rgb(59 130 246)"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>
        <span class="mt-0.5">All Files</span>
      </div>
      <div class="flex flex-auto flex-col mt-4 gap-y-2 overflow-y-auto">
        <For each={files}>
          {(file) => (
            <div class="flex flex-1 items-center p-2 border border-gray-200 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="rgb(250 204 21)"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <div>
                <div class="text-sm">{file.name}</div>
                <div class="text-xs text-gray-400">
                  {file.size} bytes, {file.addedAt.toDateString()}
                </div>
              </div>
              <div class="flex flex-1 justify-end mr-2">
                <button class="text-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#424242"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
  );
};
