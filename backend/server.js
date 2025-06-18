const express = require('express');
const cors = require('cors');
const sentimentRoutes = require('./routes/sentimentRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const scrapeRoutes = require('./routes/scrapeRoutes');
require('dotenv').config();

const app = express();

// ✅ Allow CORS only from your deployed frontend
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/sentiment', sentimentRoutes);
app.use('/api/summarize', summaryRoutes);
app.use('/api/scrape', scrapeRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
