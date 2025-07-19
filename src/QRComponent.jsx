import QRCodeStyling from "qr-code-styling";
import { useRef, useEffect } from "react";
const QRComponent = ({ options }) => {
  const qrRef = useRef(null);
  const qrInstance = useRef(null);
  useEffect(() => {
    if (!qrInstance.current) {
      qrInstance.current = new QRCodeStyling(options);
      qrInstance.current.append(qrRef.current);
    } else {
      qrInstance.current.update(options);
    }
  }, [options]);
  return <div className="flex justify-center p-2 m-2" ref={qrRef} />;
};

export default QRComponent;
