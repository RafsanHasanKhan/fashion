const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  productItemId: String,
  name: {
    type: String,
    trim: true,
    required: [true, 'Product name is required'], // Custom error message
    minlength: [3, 'Product name must be at least 3 characters long'],
  },
  quantity: Number,
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive value'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    
  },
});

module.exports = mongoose.model('Cart', cartSchema);