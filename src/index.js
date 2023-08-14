const express = require('express');

// Initialize express app
const app = express();


// Routes configuration
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Welcome to the api of calendar app'
  });
})

app.listen(4000, () => {
  console.log(`listening on port 4000`);
});