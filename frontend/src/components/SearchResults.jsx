// src/components/SearchResults.jsx
import React from 'react';

function SearchResults({ results }) {
  const getTranslatedLink = (url) => {
    return `https://translate.google.com/translate?hl=si&sl=auto&tl=si&u=${encodeURIComponent(url)}`;
  };

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <div className="results-list">
        {results.map((result, index) => (
          <div className="result-card" key={index}>
            <a
              href={getTranslatedLink(result.link)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{result.title}</h3>
            </a>
            <p>{result.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
