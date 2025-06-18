const express = require('express');
const router = express.Router();
const { summarizeNews } = require('../controllers/summaryController');

router.post('/', summarizeNews);
module.exports = router;
