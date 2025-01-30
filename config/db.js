const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Use MongoDB connection URI from .env file
    await mongoose.connect(process.env.MONGO_URI); // No deprecated options used
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Exporting the connectDB function for use in other parts of the app
module.exports = connectDB;