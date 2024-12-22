// src/components/OCRResult.jsx
import React from 'react';
import axios from 'axios';

function OCRResult({ ocrText, translateText, setSearchResults }) {
  const handleSearch = async () => {
    if (!ocrText.trim()) {
      alert('Please extract the text first.');
      return;
    }
    try {
      const response = await axios.post('https://amyfy-backend-chi.vercel.app/api/search', { query: translateText });
      if (response.data.results) {
        setSearchResults(response.data.results);
        {console.log("response.data.results: ", response.data.results)}
      } else {
        alert('No results found.');
      }
    } catch (error) {
      alert('Failed to fetch search results. Please try again.');
    }
  };

  return (
    <div className="ocr-result">
      <h2>Extracted and Translated Text</h2>
      <div className="ocr-text-section">
        <h3>Extracted Question:</h3>
        <div className="ocr-text-box" style={{ color: 'black' }}>{ocrText}</div>
      </div>
      <div className="translated-text-section">
        <h3>Translated Question:</h3>
        <div className="translated-text-box" style={{ color: 'blue' }}>{translateText}</div>
      </div>
      <button className="search-button" onClick={handleSearch}>Search Online</button>
    </div>
  );
}

export default OCRResult;
