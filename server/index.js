const mongoose = require('mongoose');
// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// MongoDB connection URI from environment variables
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ahlge.mongodb.net/fashion?retryWrites=true&w=majority`;

// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process on connection failure
  });

// JWT Authentication
app.post('/jwt', (req, res) => {
  const user = req.body;
  const secret = process.env.JWT_SECRET || 'defaultSecretKey'; // Use a secret key from the environment or a fallback
  try {
    const token = jwt.sign(user, secret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error generating token', error: error.message });
  }
});



// Import routes
const productRouters = require('./api/routes/productRoutes');
const cartRouters = require('./api/routes/cartRoutes');
const userRouters = require('./api/routes/userRoutes');

// Mount routes
app.use('/carts', cartRouters);
app.use('/products', productRouters);
app.use('/users', userRouters);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Welcome to the Express-MongoDB Server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
