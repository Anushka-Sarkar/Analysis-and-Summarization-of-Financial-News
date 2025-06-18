# 📊 Financial News Sentiment Analysis App

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
└── README.md
```
---

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
PORT=5000
HF_API_URL=HF_API_URL=https://buchhi-fin-sentiment-api.hf.space
FRONTEND_URL=https://analysis-and-summarization-of-finan.vercel.app
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
## 🌐 **Live Demo**

[Website](https://analysis-and-summarization-of-finan.vercel.app/)

---
## Interface Overview
Click a news source button to either open the page or scrape headlines.

Click on a scraped headline to analyze sentiment.

Paste a full article in the summarization field to generate a summary.

---
