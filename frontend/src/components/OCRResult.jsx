import React from 'react';
import axios from 'axios';

function OCRResult({ ocrText, setSearchResults }) {
  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/search', { query: ocrText });
      setSearchResults(response.data.results);
    } catch (error) {
      alert('Failed to fetch search results. Please try again.');
    }
  };

  return (
    <div className="ocr-result">
      <h2>Extracted Question</h2>
      <p>{ocrText}</p>
      <button onClick={handleSearch}>Search Online</button>
    </div>
  );
}

export default OCRResult;
