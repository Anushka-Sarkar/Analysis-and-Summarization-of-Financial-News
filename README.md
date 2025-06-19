### 📊 Financial News Sentiment Analysis App

A full-stack MERN application that enables users to:

- Analyze **sentiment** of financial headlines or snippets using Hugging Face.
- Generate **summaries** of full news articles.
- **Scrape headlines** from top financial news websites.
- Directly **browse or scrape** sources like Bloomberg, Reuters, and CNBC.

---

## 🛠 Tech Stack

- **Frontend**: React.js (Create React App), Axios, CSS
- **Backend**: Node.js, Express.js
- **ML APIs**: Hugging Face Transformers
- **Optional**: MongoDB (for future expansion)

---
## 💡 Features
🔍 Sentiment Analysis — Detect Positive / Neutral / Negative tone

📃 Summarization — Reduce long articles into key summaries

📰 Headline Scraper — Fetch headlines from finance homepages

🌐 News Source Buttons — Choose to visit or scrape URLs instantly

---
### 🧠 Models Used

## 🔍 Sentiment Analysis

The application uses a fine-tuned **DistilRoBERTa** model optimized for sentiment classification in financial contexts.

- **Model:** [`mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis`](https://huggingface.co/mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis)
- **Architecture:** DistilRoBERTa (a smaller, faster variant of RoBERTa)
- **Labels:**
  - `0`: Negative  
  - `1`: Neutral  
  - `2`: Positive
- **Input:** Headline (via direct text or extracted from URL)
- **Output:** Sentiment label with confidence scores

## 📄 Summarization

For abstractive summarization of long-form financial articles, the app uses Facebook AI's BART model:

- **Model:** [`facebook/bart-large-cnn`](https://huggingface.co/facebook/bart-large-cnn)
- **Architecture:** BART (Bidirectional and Auto-Regressive Transformers)
- **Trained on:** CNN/DailyMail dataset
- **Strengths:** Fast, high-quality summaries for long texts (e.g., scraped from news URLs)
- **Output:** 1–3 sentence abstractive summary

---
## 🌐 **Live Demo**

[Website](https://analysis-and-summarization-of-finan.vercel.app/)

---
## 🚀 Quick Start

## Folder Structure

```bash
financial-news-sentiment/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── styles/
│       └── App.js
│
├── Financial_Sentiment_and_Summarization_API/
│   ├── Dockerfile
│   ├── financial-news-sentiment-analysis.ipynb
│   ├── helper_prabowo_ml.py
│   ├── main.py                      ← FastAPI app
│   ├── requirements.txt
│
├── .gitignore
└── README.md

```

### 📦 Installation

## Clone the repository:

```bash
git clone https://github.com/your-username/financial-news-sentiment.git
cd financial-news-sentiment
```

## Backend Setup:

```bash
cd backend
npm install
```

## Create a .env file in the /backend directory with:

```bash
PORT=5000
HF_API_URL=HF_API_URL=https://buchhi-fin-sentiment-api.hf.space
FRONTEND_URL=https://analysis-and-summarization-of-finan.vercel.app
```

## Start backend:

```bash
npm start
```

## Frontend Setup:

## Create a .env file in the /backend directory with:

```bash
REACT_APP_BACKEND_URL=https://analysis-and-summarization-of-financial.onrender.com
```

## Start frontend:
```bash
cd ../frontend
npm install
npm start
```
The app will run locally at http://localhost:3000 

---

## Scripts (Frontend)

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm start`     | Run app in development mode           |
| `npm test`      | Launch the test runner                |
| `npm run build` | Create a production build in `build/` |
| `npm run eject` | Eject CRA config (irreversible!)      |

---
## Interface Overview
Click a news source button to either open the page or scrape headlines.

Click on a scraped headline to analyze sentiment.

Paste a full article in the summarization field to generate a summary.

---
