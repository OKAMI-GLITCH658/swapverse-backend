const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const FEE_RECIPIENT = '0x3B0DD7756f71c9b0ca31b01C79c1B8a7e2B1b23b';
const FEE_PERCENTAGE = 0.001; // 0.1%

app.get('/swap', async (req, res) => {
  const { buyToken, sellToken, sellAmount } = req.query;

  if (!buyToken || !sellToken || !sellAmount) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
 const response = await axios.get('https://api.0x.org/swap/v2/quote', {
  params: {
    buyToken,
    sellToken,
    sellAmount,
    feeRecipient: FEE_RECIPIENT,
    buyTokenPercentageFee: FEE_PERCENTAGE
  },
headers: {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  'Accept-Encoding': 'gzip',
  'Accept': 'application/json',
  '0x-api-key': 'fbc68c07-d4b3-41fc-b1f0-b94d9fb53491',
}

});

    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`SwapVerse backend running on port ${PORT}`);
});

