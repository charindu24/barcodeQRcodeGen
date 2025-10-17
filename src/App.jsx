import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Barcode from 'react-barcode';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [qrColor, setQrColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  const [barcodeColor, setBarcodeColor] = useState('#000000');
  const [barcodeTextColor, setBarcodeTextColor] = useState('#000000');
  const [barcodeType, setBarcodeType] = useState('CODE128');

  const qrRef = useRef();
  const barcodeRef = useRef();

  const downloadQRCode = () => {
    if (!text) return;
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qrcode.png';
    link.click();
  };

  const downloadBarcode = () => {
    if (!text) return;
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

      <input
        type="text"
        placeholder="Enter text or number"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-field"
      />

      {/* Color Pickers */}
      <div className="color-picker">
        <label>
          QR Color:
          <input type="color" value={qrColor} onChange={(e) => setQrColor(e.target.value)} />
        </label>
        <label>
          QR Background:
          <input type="color" value={qrBgColor} onChange={(e) => setQrBgColor(e.target.value)} />
        </label>
        <label>
          Barcode Color:
          <input type="color" value={barcodeColor} onChange={(e) => setBarcodeColor(e.target.value)} />
        </label>
        <label>
          Barcode Text Color:
          <input type="color" value={barcodeTextColor} onChange={(e) => setBarcodeTextColor(e.target.value)} />
        </label>
      </div>

      {/* Barcode Type */}
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

      {/* QR & Barcode Cards */}
      <div className="cards">
        <div className="card" ref={qrRef}>
          <h3>QR Code</h3>
          <QRCodeCanvas
            value={text || ' '}
            size={200}
            fgColor={qrColor}
            bgColor={qrBgColor}
          />
          <button
            className="download-btn"
            onClick={downloadQRCode}
            disabled={!text}
          >
            Download QR
          </button>
        </div>

        <div className="card" ref={barcodeRef}>
          <h3>Barcode ({barcodeType})</h3>
          <Barcode
            value={text || ' '}
            format={barcodeType}
            lineColor={barcodeColor}
            text={text || ' '}
            textColor={barcodeTextColor}
            width={2}
            height={100}
            displayValue={true}
          />
          <button
            className="download-btn"
            onClick={downloadBarcode}
            disabled={!text}
          >
            Download Barcode
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Charindu Bandaranayake
      </footer>
    </div>
  );
}

export default App;
