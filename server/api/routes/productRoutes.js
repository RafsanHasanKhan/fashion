const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/', productController.getAllProductItems);
router.post('/', productController.postProductItem);

module.exports = router;