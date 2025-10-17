import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Barcode from 'react-barcode';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [qrColor, setQrColor] = useState('#000000');
  const [barcodeColor, setBarcodeColor] = useState('#000000');
  const [barcodeType, setBarcodeType] = useState('CODE128'); // default 1D type
  const qrRef = useRef();
  const barcodeRef = useRef();

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qrcode.png';
    link.click();
  };

  const downloadBarcode = () => {
    const svg = barcodeRef.current.querySelector('svg');
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(xml);
    const url = 'data:image/svg+xml;base64,' + svg64;

    const img = new Image();
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = pngFile;
      link.download = 'barcode.png';
      link.click();
    };
  };

  return (
    <div className="container">
      <h1 className="title">Custom QR & Barcode Generator</h1>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter text or number"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-field"
      />

      {/* Color pickers */}
      <div className="color-picker">
        <label>
          QR Color:
          <input type="color" value={qrColor} onChange={(e) => setQrColor(e.target.value)} />
        </label>
        <label>
          Barcode Color:
          <input type="color" value={barcodeColor} onChange={(e) => setBarcodeColor(e.target.value)} />
        </label>
      </div>

      {/* Barcode type selection */}
      <div className="type-selection">
        <label>
          Barcode Type:
          <select value={barcodeType} onChange={(e) => setBarcodeType(e.target.value)}>
            <option value="CODE128">Code128</option>
            <option value="CODE39">Code39</option>
            <option value="EAN13">EAN-13</option>
            <option value="EAN8">EAN-8</option>
            <option value="UPC">UPC</option>
            <option value="ITF">Interleaved 2 of 5</option>
          </select>
        </label>
      </div>

      {text && (
        <div className="cards">
          {/* QR Code Card */}
          <div className="card" ref={qrRef}>
            <h3>QR Code</h3>
            <QRCodeCanvas value={text} size={200} fgColor={qrColor} />
            <button className="download-btn" onClick={downloadQRCode}>
              Download QR
            </button>
          </div>

          {/* Barcode Card */}
          <div className="card" ref={barcodeRef}>
            <h3>Barcode ({barcodeType})</h3>
            <Barcode
              value={text}
              format={barcodeType}
              lineColor={barcodeColor}
              width={2}
              height={100}
              displayValue={true}
            />
            <button className="download-btn" onClick={downloadBarcode}>
              Download Barcode
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
