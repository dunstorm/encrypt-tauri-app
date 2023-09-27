import { Component, createSignal, Show } from "solid-js";
import QRCodeSVG from "solid-qr-code";
import encryptionPNG from "../assets/encryption.png";
import { invoke } from "@tauri-apps/api";

export interface QRModalProps {
  hideModal: () => void;
}

const QRModal: Component<QRModalProps> = ({ hideModal }) => {
  const [wifiIpAddress, setWifiIpAddress] = createSignal("");

  // fetch wifi ip address
  invoke("start_setup").then((wifiIpAddress) => {
    setWifiIpAddress(wifiIpAddress as string);
  });

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white rounded-xl p-4">
        <div class="flex items-center justify-center">
          <div class="relative text-sm text-gray-500">
            {/* Close modal */}
            <div class="absolute -right-1 -top-1">
              <button class="text-gray-400 font-bold" onClick={hideModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p class="text-center">
              Scan this QR code <br /> with your phone
            </p>
            <p class="text-xs text-gray-300 text-center">{wifiIpAddress()}</p>
            <QRCodeSVG
              class="mt-2.5"
              value={"https://www.solidjs.com/"}
              size={96}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={false}
              imageSettings={{
                src: encryptionPNG,
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
