import { useState } from "react";
import "./App.css";

import QRComponent from "./QRComponent";
import { BlockPicker } from "react-color";
import { LOGO_URLS, QROptions } from "./utils/QROptions";
import QRCodeStyling from "qr-code-styling";

function App() {
  const [customLogo, setCustomLogo] = useState(null);
  const [content, setContent] = useState("https://example.com/");
  const [logo, setLogo] = useState("");
  const [body, setBody] = useState("");
  const [eyeFrame, setEyeFrame] = useState("");
  const [eyeDot, setEyeDot] = useState("");
  const [bgColor, setBgColor] = useState("#D5B882");
  const [fgColor, setFgColor] = useState("#000000");
  const [shape, setShape] = useState("circle");
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [showFgPicker, setShowFgPicker] = useState(false);
  const [fileExt, setFileExt] = useState("png");
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
    qrCode.download({ name: "qr-code", extension: fileExt });
  };
  const handleUpdate = () => {
    if (!content.trim()) {
      alert("please input data for QR code!!!");
      return;
    }
    setQrConfig({
      ...QROptions,
      shape,
      image: logo,
      data: content,
      dotsOptions: {
        type: body,
        color: fgColor,
      },
      cornersSquareOptions: {
        type: eyeFrame,
      },
      cornersDotOptions: {
        type: eyeDot,
      },
      backgroundOptions: {
        round: shape === "circle" ? 1 : 0,
        color: bgColor,
      },
    });
  };
  const getFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCustomLogo(reader.result);
      setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      <h1>QR Code Generator</h1>
      <div id="body-container" className="body flex">
        <div id="input-container" className="flex flex-col items-start p-2">
          {/* content input */}
          <div
            id="content-container"
            className="flex flex-col my-2 py-2 w-full border border-white border-b-black shadow-lg"
          >
            <label className="text-start py-1 font-bold">Enter Content</label>
            <input
              className="p-2 border rounded-lg"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          {/* color input */}
          <div
            id="color-container"
            className="flex my-2 py-2 w-full border border-white border-b-black shadow-lg"
          >
            <div
              id="foreground-container"
              className="blockpicker py-1 pr-1 mr-1 cursor-pointer"
            >
              <h6 className="py-1 font-bold">Select Foreground Color</h6>
              <div
                onClick={() => setShowFgPicker(!showFgPicker)}
                className="w-[100px] h-[50px] border-2 border-white rounded-lg"
                style={{
                  backgroundColor: fgColor,
                }}
              ></div>
              {showFgPicker && (
                <BlockPicker
                  color={fgColor}
                  onChange={(color) => {
                    setFgColor(color.hex);
                  }}
                />
              )}
            </div>
            <div
              id="background-container"
              className="blockpicker py-1 cursor-pointer"
            >
              <h6 className="py-1 font-bold">Select Background Color</h6>
              <div
                onClick={() => setShowBgPicker(!showBgPicker)}
                className="w-[100px] h-[50px] border-2 border-white rounded-lg"
                style={{
                  backgroundColor: bgColor,
                }}
              ></div>
              {showBgPicker && (
                <BlockPicker
                  color={bgColor}
                  onChange={(color) => {
                    setBgColor(color.hex);
                  }}
                />
              )}
            </div>
          </div>
          {/* shape input */}
          <div
            id="shape-container"
            className="flex flex-col my-2 py-2 w-full border border-white border-b-black shadow-lg"
          >
            <label className="text-start py-1 font-bold">Shape</label>
            <select
              className="p-1 bg-gray-200 rounded-lg cursor-pointer"
              onChange={(e) => setShape(e.target.value)}
              value={shape}
            >
              <option value="circle">Circle</option>
              <option value="square">Square</option>
            </select>
          </div>
          {/* logo input */}
          <div className="my-2 py-2 w-full border border-white border-b-black shadow-lg">
            <label className="text-start py-1 font-bold">Select Logo</label>
            <div id="pre-upload-logo-container" className="flex">
              <div
                onClick={() => setLogo("")}
                className={`w-10 h-10 p-2 mx-1 rounded-lg flex items-center cursor-pointer justify-center ${
                  logo === "" ? "ring-2 ring-blue-400" : ""
                }`}
              >
                None
              </div>
              {LOGO_URLS.map((img) => (
                <div
                  key={img.name}
                  onClick={() => setLogo(img.url)}
                  className={`w-10 h-10 p-2 mx-1 rounded-lg cursor-pointer flex items-center justify-center ${
                    logo === img.url ? "ring-2 ring-blue-400" : ""
                  }`}
                >
                  <img src={img.url} className="w-8 h-8" alt={img.name} />
                </div>
              ))}
            </div>
            {customLogo && (
              <div
                onClick={() => setLogo(customLogo)}
                className={`w-50 h-50 p-2 m-1 rounded-lg cursor-pointer flex items-center justify-center ${
                  logo === customLogo ? "ring-2 ring-blue-400" : ""
                }`}
              >
                <img src={customLogo} className="w-40 h-40" alt="Custom logo" />
              </div>
            )}
            <div id="upload-logo-container" className="flex items-center my-2">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-gray-200 rounded hover:bg-gray-300">
                Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={getFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {/* Design input */}
          <div className="my-2 py-2 w-full border border-white border-b-black shadow-lg">
            <div
              id="body-container"
              className="flex flex-col my-2 py-2 w-full border border-white border-b-black shadow-lg"
            >
              <label className="text-start py-1 font-bold">Select Body</label>
              <select
                className="p-1 bg-gray-200 rounded-lg cursor-pointer"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              >
                <option value="dots">Dots</option>
                <option value="square">Square</option>
                <option value="rounded">Rounded</option>
                <option value="classy">Classy</option>
                <option value="extra-rounded">Extra Rounded</option>
                <option value="classy-rounded">Classy Rounded</option>
              </select>
            </div>
            <div
              id="body-container"
              className="flex flex-col my-2 py-2 w-full border border-white border-b-black shadow-lg"
            >
              <label className="text-start py-1 font-bold">
                Select Eye Frame
              </label>
              <select
                className="p-1 bg-gray-200 rounded-lg cursor-pointer"
                onChange={(e) => setEyeFrame(e.target.value)}
                value={eyeFrame}
              >
                <option value="dots">Dots</option>
                <option value="square">Square</option>
                <option value="rounded">Rounded</option>
                <option value="classy">Classy</option>
                <option value="extra-rounded">Extra Rounded</option>
                <option value="classy-rounded">Classy Rounded</option>
              </select>
            </div>
            <div
              id="body-container"
              className="flex flex-col mt-2 pt-2 w-full shadow-lg"
            >
              <label className="text-start py-1 font-bold">
                Select Eye Dot
              </label>
              <select
                className="p-1 bg-gray-200 rounded-lg cursor-pointer"
                onChange={(e) => setEyeDot(e.target.value)}
                value={eyeDot}
              >
                <option value="dots">Dots</option>
                <option value="square">Square</option>
                <option value="rounded">Rounded</option>
                <option value="classy">Classy</option>
                <option value="extra-rounded">Extra Rounded</option>
                <option value="classy-rounded">Classy Rounded</option>
              </select>
            </div>
          </div>
        </div>
        <div className="qr-container">
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
            <select
              value={fileExt}
              onChange={(e) => setFileExt(e.target.value)}
              name="download-opt"
              id="download-opt"
              className="m-2 p-2 rounded-lg bg-gray-100 cursor-pointer hover:border hover:border-blue-300"
            >
              <option value="png">PNG</option>
              <option value="svg">SVG</option>
              <option value="jpeg">JPEG</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
