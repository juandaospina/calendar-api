const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

// Initialize express app
const app = express();

// Database connection -> It must go below initialization of express app  
dbConnection();  

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/events', require('./routes/events.route'));


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});