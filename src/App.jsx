import { useState } from "react";
import "./App.css";

import QRComponent from "./QRComponent";
import { BlockPicker } from "react-color";
import { QROptions } from "./utils/QROptions";
import QRCodeStyling from "qr-code-styling";

function App() {
  const [content, setContent] = useState("https://example.com/");
  const [bgColor, setBgColor] = useState("#D5B882");
  const [shape, setShape] = useState("circle");
  const [showPicker, setShowPicker] = useState(false);
  const [qrConfig, setQrConfig] = useState({
    ...QROptions,
    shape,
    data: content,
    backgroundOptions: {
      round: shape === "circle" ? 1 : 0,
      color: bgColor,
    },
  });
  const handelDownload = () => {
    const qrCode = new QRCodeStyling(qrConfig);
    qrCode.download({ name: "qr-code", extension: "png" });
  };
  const handleUpdate = () => {
    if (!content.trim()) {
      alert("please input data for QR code!!!");
      return;
    }
    setQrConfig({
      ...QROptions,
      shape,
      data: content,
      backgroundOptions: {
        round: shape === "circle" ? 1 : 0,
        color: bgColor,
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1>QR Code Generator</h1>
      <div className="flex justify-center">
        <div className="flex flex-col m-2 p-2 items-center justify-center">
          <label htmlFor="">Enter Content</label>
          <input
            className="m-2 p-2 border rounded-lg"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="blockpicker m-2 p-2">
          <h6>Select Background Color</h6>
          <div
            onClick={() => setShowPicker(!showPicker)}
            className="w-[100px] h-[50px] border-2 border-white"
            style={{
              backgroundColor: bgColor,
            }}
          ></div>
          {showPicker && (
            <BlockPicker
              color={bgColor}
              onChange={(color) => {
                setBgColor(color.hex);
              }}
            />
          )}
        </div>

        <div className="flex flex-col m-2 p-2">
          <label>Shape</label>
          <select
            className="p-1 bg-gray-200 rounded-lg cursor-pointer"
            onChange={(e) => setShape(e.target.value)}
            value={shape}
          >
            <option value="circle">Circle</option>
            <option value="square">Square</option>
          </select>
        </div>
      </div>
      <QRComponent options={qrConfig} />
      <div className="flex justify-center">
        <button
          className="m-2 p-2 rounded-lg bg-gray-500"
          onClick={handleUpdate}
        >
          Create QR
        </button>

        <button
          className="m-2 p-2 rounded-lg bg-gray-500"
          onClick={handelDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
