const Product = require('../models/Product');

// Controller function to get all product items
const getAllProductItems = async (req, res) => {
  try {
    // Retrieve all products
    const products = await Product.find({}).sort({ createdAt: -1 });

    // Check if products exist
    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }

    // Send successful response
    res.status(200).json(products);
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching products:', error);

    // Send error response to the client
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// post a new product item
const postProductItem = async (req, res) => {
  const newItem = req.body;
  console.log(newItem);
  try {
    const result = await Product.create(newItem);
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  getAllProductItems,
  postProductItem,
};