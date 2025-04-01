import React, { useState, useCallback } from 'react';
import QRCode from 'qrcode';
import { Sun, Moon, Download, Copy, QrCode } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [qrColor, setQrColor] = useState('#000000');
  const [showToast, setShowToast] = useState(false);

  const generateQR = useCallback(async () => {
    if (!url) return;
    
    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: {
          dark: qrColor,
          light: '#ffffff'
        }
      });
      setQrCode(qrDataUrl);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  }, [url, qrColor]);

  const downloadQR = useCallback(() => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCode;
    link.click();
  }, [qrCode]);

  const copyUrl = useCallback(() => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, [url]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Toast Notification */}
      <div
        className={`fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        Link copied to clipboard!
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-colors ${
            darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className={`p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-center mb-8">
            <QrCode size={32} className="mr-2" />
            <h1 className="text-3xl font-bold">QR Code Generator</h1>
          </div>

          <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your URL here"
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="h-12 w-full sm:w-32 rounded cursor-pointer"
                />
                
                <button
                  onClick={generateQR}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Generate QR
                </button>
              </div>
            </div>

            {/* QR Code Display */}
            <div className="flex flex-col items-center space-y-4">
              {qrCode ? (
                <>
                  <img
                    src={qrCode}
                    alt="QR Code"
                    className="w-64 h-64 p-4 rounded-xl bg-white"
                  />
                  <p className="text-sm opacity-75">QR for: {url}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button
                      onClick={downloadQR}
                      className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                        darkMode
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      <Download size={20} />
                      Download QR
                    </button>
                    
                    <button
                      onClick={copyUrl}
                      className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                        darkMode
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      <Copy size={20} />
                      Copy Link
                    </button>
                  </div>
                </>
              ) : (
                <div className={`text-center p-16 rounded-xl ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <p className="text-lg opacity-75">
                    Enter a link and click Generate to see your QR code
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;