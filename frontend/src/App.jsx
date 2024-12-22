// src/App.jsx
import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import OCRResult from './components/OCRResult';
import SearchResults from './components/SearchResults';
import './App.css';
import logo from './logo.svg';

function App() {
  const [ocrText, setOcrText] = useState('');
  const [translateText, setTranslateText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="app">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" /> {/* Placeholder for your logo */}
        <h1>Question Image Search</h1>
      </header>
      <main className="main">
        <div className="left-panel">
          <ImageUploader setOcrText={setOcrText} setTranslateText={setTranslateText} />
        </div>
        <div className="right-panel">
          <OCRResult 
            ocrText={ocrText} 
            translateText={translateText} 
            setSearchResults={setSearchResults} 
          />
        </div>
        <SearchResults results={searchResults} />
      </main>
      <div className="results-section">
        {searchResults.length > 0 && <SearchResults results={searchResults} />}
      </div>
      <footer className="footer">
        <p>Powered by OCR and Search APIs</p>
      </footer>
    </div>
  );
}

export default App;
