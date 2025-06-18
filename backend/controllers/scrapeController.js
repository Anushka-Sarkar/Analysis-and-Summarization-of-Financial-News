const axios = require('axios');
const cheerio = require('cheerio');

exports.scrapeHeadlines = async (req, res) => {
  const { url } = req.body;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const headlines = [];

    $('h1, h2, h3, a').each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 30 && text.length < 200) {
        headlines.push(text);
      }
    });

    res.json({ headlines: [...new Set(headlines)].slice(0, 20) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Scraping failed' });
  }
};