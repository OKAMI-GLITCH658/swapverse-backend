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
        takerAddress: '0x0000000000000000000000000000000000000000',  // optional
        feeRecipient: '0x3B0DD7756f71c9b0ca31b01C79c1B8a7e2B1b23b',
        buyTokenPercentageFee: 0.001,
      },
      headers: {
        '0x-api-key': 'fbc68c07-d4b3-41fc-b1f0-b94d9fb53491',
        'Accept': 'application/json',
        'User-Agent': 'SwapVerseBot/1.0',
      }
    });

    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
