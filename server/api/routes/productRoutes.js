const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/', productController.getAllProductItems);
router.post('/', productController.postProductItem);
router.delete('/:id', productController.deleteProductItem);
router.get('/:id', productController.singleProductItem);
router.patch('/:id', productController.updateProductItem);

module.exports = router;