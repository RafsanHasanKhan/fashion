const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const Product = require('../models/Product')


router.get('/', productController.getAllProductItems);

module.exports = router;