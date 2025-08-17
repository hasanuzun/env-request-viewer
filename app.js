
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const envVars = process.env;
  const requestDetails = {
    method: req.method,
    url: req.url,
    headers: req.headers
  };

  res.send(`
    <h1>Environment Variables</h1>
    <pre>${JSON.stringify(envVars, null, 2)}</pre>
    <h1>Request Details</h1>
    <pre>${JSON.stringify(requestDetails, null, 2)}</pre>
  `);
});

// Lightweight health probe
app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
