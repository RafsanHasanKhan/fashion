const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define product schema
const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Product name is required'], // Custom error message
      minlength: [3, 'Product name must be at least 3 characters long'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['electronics', 'fashion', 'groceries', 'home', 'beauty'], // Predefined categories
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description must be less than 500 characters'],
    },

    image: {
      type: String,
      required: [true, 'Image URL is required'],
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp))$/,
        'Please provide a valid image URL',
      ],
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

// Create model
const Product = mongoose.model('Product', productSchema);

// Export model
module.exports = Product;
