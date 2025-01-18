const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create model
const Product = mongoose.model('Product', productSchema);

// Export model
module.exports = Product;
