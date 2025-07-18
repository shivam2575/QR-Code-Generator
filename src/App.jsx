import { useEffect, useRef, useState } from "react";
import "./App.css";
import QRCodeStyling from "qr-code-styling";
import QRBorderPlugin from "qr-border-plugin";

const qrCode = new QRCodeStyling({
  shape: "circle",
  type: "svg",
  width: 500,
  height: 500,
  // margin: 60,
  data: "test",
  image: "https://qr-code-styling.com/b9eac011a0558695563d6081a8395ccb.png",
  dotsOptions: {
    type: "dots",
    color: "#000000",
  },
  backgroundOptions: {
    round: 1,
    color: "#D5B882",
  },
  cornersSquareOptions: {
    type: "rounded",
  },
  cornersDotOptions: {
    type: "rounded",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
  plugins: [
    QRBorderPlugin({
      round: 1,
      thickness: 20,
      color: "#FF0000",
    }),
  ],
});

function App() {
  const [url, setUrl] = useState("https://example.com/");
  const qrCodeRef = useRef(null);
  useEffect(() => {
    qrCode.append(qrCodeRef.current);
  }, []);
  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [url]);
  const onUrlChange = (e) => {
    e.preventDefault();
    setUrl(e.target.value);
  };
  const handelClick = () => {
    qrCode.download({
      extension: "png",
    });
  };
  return (
    <>
      <h1>QR Code</h1>
      <input
        className="m-2 p-2 border rounded-lg"
        value={url}
        onChange={onUrlChange}
      />
      {/* <div className="border border-black rounded-full border-20">
        <h1>SCAN ME</h1> */}
      <div ref={qrCodeRef} />
      {/* </div> */}

      <button className="m-2 p-2 rounded-lg bg-gray-500" onClick={handelClick}>
        Download
      </button>
    </>
  );
}

export default App;
