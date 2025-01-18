const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/', productController.getAllProductItems);
router.post('/', productController.postProductItem);
router.delete('/:id', productController.deleteProductItem);

module.exports = router;