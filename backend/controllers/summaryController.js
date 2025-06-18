const axios = require('axios');

exports.summarizeNews = async (req, res) => {
  const { articleText, articleUrl } = req.body;

  // Construct payload for Hugging Face API
  const payload = articleText
    ? { text: articleText }
    : articleUrl
    ? { url: articleUrl }
    : null;

  if (!payload) {
    return res.status(400).json({ error: "Provide either 'articleText' or 'articleUrl' in the request." });
  }

  try {
    const response = await axios.post(
      `${process.env.HF_API_URL}/summarize`,
      payload
    );
    res.json({ summary: response.data.summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Summarization failed' });
  }
};
