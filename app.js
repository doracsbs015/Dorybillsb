// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Importing routes
const foodRoutes = require('./routes/foodRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(cors());  // Allow Cross-Origin requests
app.use(bodyParser.json());  // Parse incoming JSON data

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

// Routes
app.use('/api/Food', foodRoutes);  // Food-related routes
app.use('/api/User', authRoutes);  // User-related routes
app.use('/api/Order', orderRoutes);  // Order-related routes

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to DoraFoodBuilding API!');
});

// Set the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});