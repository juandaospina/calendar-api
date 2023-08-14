const express = require('express');
require('dotenv').config();


// Initialize express app
const app = express();


// Routes configuration
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Welcome to the api of calendar app'
  });
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});