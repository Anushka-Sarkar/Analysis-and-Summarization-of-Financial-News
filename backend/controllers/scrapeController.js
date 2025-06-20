const axios = require('axios');

exports.scrapeHeadlines = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Provide a 'url' in the request." });
  }

  try {
    const response = await axios.post(
      `${process.env.HF_API_URL}/scrape`,
      { url }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Scraping failed' });
  }
};
