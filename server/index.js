// Load environment variables from .env file
require('dotenv').config();

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// MongoDB connection URI from environment variables
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ahlge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

// Define a simple route
app.get('/', (req, res) => {
  res.send('Welcome to the Express-MongoDB Server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
