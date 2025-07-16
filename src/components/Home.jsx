import React, { useState} from 'react'
import '../assets/Home.css';
import QRCode from 'react-qr-code';


const Home = () => {
  const [inputValue, setInputValue] = useState('')
  const [qrCode, setQrCode] = useState(null);
  const [isHidden, setIsHidden] = useState(false);


  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleClick = () => {
    console.log("Input Value:", inputValue);
    if (!inputValue) {
      alert("Please enter a value to generate QR Code");
      return;
    }
    setQrCode(inputValue);
    setIsHidden(true);
  }

  return (
    <div className="home-container">
      <h1>Welcome to the QR Code Generator</h1>
      <div className="home-main-2">
      <div className="qr-generator">
        <h3>Generate</h3>
        <input 
        type="text" 
        onChange={handleInputChange}
        value={inputValue}
        placeholder="Enter text or URL to generate QR Code"
        />
        <button onClick={handleClick}>Generate QR Code</button>
      </div>
      <div className='horizontal-line'></div>
      <div className="qr-display">
        <h3 hidden={isHidden}>QR Code will be displayed here</h3>
        {qrCode && (
          <div className="qr-code">
            {/* QR Code will be displayed here */}
            <p>QR Code for: {qrCode}</p>
            <QRCode
              size={200}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={qrCode}
              viewBox={`0 0 256 256`}
            />
          </div>
        )}
        </div>
        </div>
    </div>
  )
}

export default Home