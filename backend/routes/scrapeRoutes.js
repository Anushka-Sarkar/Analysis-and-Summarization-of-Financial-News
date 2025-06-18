const express = require('express');
const router = express.Router();
const { scrapeHeadlines } = require('../controllers/scrapeController');

router.post('/', scrapeHeadlines);
module.exports = router;