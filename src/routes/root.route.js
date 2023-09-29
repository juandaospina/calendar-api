const express = require('express');
const router = express.Router();

router.get('/', function (req, res = express.response) {
  res.status(201).json({
    ok: true,
    message: 'Welcome to the Calendar API',
  });
});

module.exports = router;
