import { useState, useEffect } from 'react'
import '../assets/Home.css';
import QRCode from 'react-qr-code';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const [inputValue, setInputValue] = useState('')
  const [qrCode, setQrCode] = useState(null);
  const [allQRCodes, setAllQRCodes] = useState([]);
  const [isHidden, setIsHidden] = useState(false);


  useEffect(() => {
    const savedQRCodes = localStorage.getItem('qrCode');
    if (savedQRCodes) {
      setAllQRCodes(JSON.parse(savedQRCodes));
    }
    console.log("All QR Codes state after loading from localStorage:", allQRCodes);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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

  const handleClickSave = () => {
    let nextId = 1;
    if (allQRCodes.length > 0) {
      nextId = allQRCodes[0].id + 1;
    }

    const newCode = { id: nextId, value: qrCode };
    const qrCodeSaveAll = [newCode, ...allQRCodes];
    setAllQRCodes(qrCodeSaveAll);
    localStorage.setItem('qrCode', JSON.stringify(qrCodeSaveAll));
  };

  const handleDelete = (id) => {
    const updatedQRCodes = allQRCodes.filter((code) => code.id !== id);
    setAllQRCodes(updatedQRCodes);
    localStorage.setItem('qrCode', JSON.stringify(updatedQRCodes));

    toast('QR Code deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <>
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
            <button onClick={handleClick} className='btn-primary'>Generate QR Code</button>
          </div>
          <div className='horizontal-line'></div>
          <div className="qr-display">
            <h3 hidden={isHidden}>QR Code will be displayed here</h3>
            {qrCode && (
              <>
                <div className="qr-container">
                  <div className="qr-code">
                    {/* QR Code will be displayed here */}
                    <p>QR Code for: {qrCode}</p>
                    <QRCode
                      size={200}
                      style={{ height: "200px", maxWidth: "100%", width: "100%" }}
                      value={qrCode}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                  <button onClick={handleClickSave} className='btn-primary'>Save <br /> 🗐</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {allQRCodes.length === 0 ? (
        <div className='qr-zero-history'>
          <p>No QR Codes saved Yet</p></div>
      ) : (
        <div className="qr-history">
          <h3>History</h3>
          <ul>
            {allQRCodes.map((code) => (
              <li key={code.id}>
                <QRCode
                  size={100}
                  style={{ height: "150px", maxWidth: "100%", width: "100%" }}
                  value={code.value}
                  viewBox={`0 0 256 256`}
                />
                <p>{code.value}</p>
                <button className='delete-btn' onClick={() => handleDelete(code.id)}>Delete</button>
              </li>
            ))}
          </ul></div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default Home