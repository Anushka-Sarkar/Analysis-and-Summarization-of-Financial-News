const express = require('express');
const cors = require('cors');
const sentimentRoutes = require('./routes/sentimentRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const scrapeRoutes = require('./routes/scrapeRoutes');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://analysis-and-summarization-of-finan.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
  },
  credentials: true, // optional: if using cookies/auth
}));

app.use(express.json());

// Routes
app.use('/api/sentiment', sentimentRoutes);
app.use('/api/summarize', summaryRoutes);
app.use('/api/scrape', scrapeRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
