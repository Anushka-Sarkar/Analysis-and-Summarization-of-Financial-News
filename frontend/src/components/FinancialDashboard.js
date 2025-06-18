import React, { useState } from 'react';
import axios from 'axios';
import NewsSources from './NewsSources';
import '../styles/FinancialDashboard.css';

function FinancialDashboard() {
  const [inputText, setInputText] = useState('');
  const [articleText, setArticleText] = useState('');
  const [scrapeUrl, setScrapeUrl] = useState('');
  const [headlines, setHeadlines] = useState([]);
  const [sentiment, setSentiment] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loadingAnalyze, setLoadingAnalyze] = useState(false);
  const [loadingSummarize, setLoadingSummarize] = useState(false);
  const [loadingScrape, setLoadingScrape] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setLoadingAnalyze(true);
    console.log('Analyzing sentiment for:', inputText);

    try {
      const res = await axios.post('http://localhost:5000/api/sentiment', {
        inputText,
      });
      console.log('Response from sentiment API:', res.data);
      setSentiment(res.data);
    } catch (err) {
      console.error('Sentiment analysis failed:', err);
      setSentiment({ sentiment: 'Error', confidence: 0 });
    }

    setLoadingAnalyze(false);
  };

  const handleSummarize = async () => {
    if (!articleText.trim()) return;
    setLoadingSummarize(true);
    console.log('Summarizing article:', articleText);

    try {
      const res = await axios.post('http://localhost:5000/api/summarize', {
        articleText,
      });
      console.log('Response from summarize API:', res.data);
      setSummary(res.data.summary);
    } catch (err) {
      console.error('Summarization failed:', err);
      setSummary('Error summarizing.');
    }

    setLoadingSummarize(false);
  };

  const handleScrape = async (urlToUse = scrapeUrl) => {
    if (!urlToUse.trim()) return;
    setLoadingScrape(true);
    console.log('Scraping headlines from URL:', urlToUse);

    try {
      const res = await axios.post('http://localhost:5000/api/scrape', {
        url: urlToUse,
      });
      setHeadlines(res.data.headlines);
    } catch (err) {
      console.error('Scraping failed:', err);
      setHeadlines(['Failed to scrape headlines.']);
    }

    setLoadingScrape(false);
  };

  // Callback to allow NewsSources to trigger scraping directly
  const handleSourceUse = (url) => {
    setScrapeUrl(url);
    handleScrape(url);
  };

  return (
    <div className="container">
      <h1>Financial News Sentiment Analysis</h1>

      <NewsSources onSourceClick={handleSourceUse} />

      <h3>Scrape Headlines from a News Page</h3>
      <input
        type="text"
        value={scrapeUrl}
        onChange={(e) => setScrapeUrl(e.target.value)}
        placeholder="Enter news page URL..."
      />
      <button onClick={() => handleScrape()} disabled={loadingScrape}>
        {loadingScrape ? 'Scraping...' : 'Scrape Headlines'}
      </button>

      <ul>
        {headlines.map((headline, idx) => (
          <li key={idx} onClick={() => setInputText(headline)}>
            {headline}
          </li>
        ))}
      </ul>

      <h3>Paste Headline or News Snippet</h3>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter headline or short news..."
      ></textarea>
      <button onClick={handleAnalyze} disabled={loadingAnalyze}>
        {loadingAnalyze ? 'Analyzing...' : 'Analyze Sentiment'}
      </button>

      {sentiment && (
        <div className="result">
          <p><strong>Sentiment:</strong> {sentiment.sentiment}</p>
          <p><strong>Confidence:</strong> {sentiment.confidence?.toFixed(3)}</p>
        </div>
      )}

      <h3>Paste Full News for Summarization</h3>
      <textarea
        value={articleText}
        onChange={(e) => setArticleText(e.target.value)}
        placeholder="Paste full news text..."
      ></textarea>
      <button onClick={handleSummarize} disabled={loadingSummarize}>
        {loadingSummarize ? 'Summarizing...' : 'Summarize'}
      </button>

      {summary && (
        <div className="result">
          <p><strong>Summary:</strong> {summary}</p>
        </div>
      )}
    </div>
  );
}

export default FinancialDashboard;
