const axios = require('axios');

exports.analyzeSentiment = async (req, res) => {
  const { inputText, url } = req.body;

  // Build payload based on what's provided
  const payload = inputText
    ? { text: inputText }
    : url
    ? { url }
    : null;

  if (!payload) {
    return res.status(400).json({ error: "Provide either 'inputText' or 'url'." });
  }

  try {
    const response = await axios.post(
      `${process.env.HF_API_URL}/predict`,
      payload
    );
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sentiment analysis failed' });
  }
};
