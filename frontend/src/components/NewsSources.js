import React from 'react';
import '../styles/NewsSources.css';

const newsSources = [
  { name: 'Times of India', url: 'https://timesofindia.indiatimes.com/business/india-business' },
  { name: 'The Hindu', url: 'https://www.thehindu.com/business/' },
  { name: 'Economic Times', url: 'https://economictimes.indiatimes.com/' },
  { name: 'Mint', url: 'https://www.livemint.com/' }
];

export default function NewsSources({ onSourceClick }) {
  return (
    <div className="news-sources">
      <h3>Select a News Site:</h3>
      <div className="source-buttons">
        {newsSources.map((source) => (
          <div key={source.name} className="source-button-group">
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              <button>Visit {source.name}</button>
            </a>
            <button onClick={() => onSourceClick(source.url)}>
              Scrape Headlines
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
