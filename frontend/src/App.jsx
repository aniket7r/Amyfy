import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import OCRResult from './components/OCRResult';
import SearchResults from './components/SearchResults';
import './App.css';

function App() {
  const [ocrText, setOcrText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="app">
      <header>
        <h1>Question Image Search</h1>
      </header>
      <main>
        <ImageUploader setOcrText={setOcrText} />
        {ocrText && <OCRResult ocrText={ocrText} setSearchResults={setSearchResults} />}
        {searchResults.length > 0 && <SearchResults results={searchResults} />}
      </main>
      <footer>
        <p>Powered by OCR and Search APIs</p>
      </footer>
    </div>
  );
}

export default App;
