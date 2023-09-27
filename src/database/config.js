const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.DB_HOST // URI of the database connection
    );
    console.log('DB connection established');
  } catch (error) {
    throw new Error('Error connecting to database: ' + error.message);
  }
};

module.exports = {
  dbConnection
};