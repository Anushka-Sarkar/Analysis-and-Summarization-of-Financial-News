const express = require('express');
const cors = require('cors');
const sentimentRoutes = require('./routes/sentimentRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const scrapeRoutes = require('./routes/scrapeRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/sentiment', sentimentRoutes);
app.use('/api/summarize', summaryRoutes);
app.use('/api/scrape', scrapeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));