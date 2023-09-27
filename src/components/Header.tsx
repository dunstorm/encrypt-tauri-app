import type { Component } from "solid-js";

interface HeaderProps {
  modal: boolean;
}

export const Header: Component<HeaderProps> = (props) => {
  return (
    <header class="flex items-center justify-between">
      <div>
        <h2 class="font-bold text-2xl">encrypt.</h2>
      </div>
      <div class="flex gap-x-2">
        <div
          class={`bg-green-200 text-green-800 ${props.modal && "invisible"} px-6 py-2 rounded-xl`}
        >
          <span>Setup done</span>
        </div>
      </div>
    </header>
  );
};
