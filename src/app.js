const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 8443;

// Enable CORS
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Proxy endpoint
app.post('/*', async (req, res) => {
  const apiUrl = req.url.substring(1);

  try {
    const response = await axios.post(apiUrl, req.body, {
      headers: {
        // Add any necessary headers here
        'Accept': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching data.');
  }

});

app.get('/*', async (req, res) => {
  res.send('This is a simple proxy server for CORS. Please use POST requests.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
