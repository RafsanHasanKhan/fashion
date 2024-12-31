const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController')

router.post('/', cartController.addToCart);
router.get('/', cartController.getCartByEmail);
router.delete('/:id', cartController.deleteCart);
router.patch('/:id', cartController.updateCart);

module.exports = router;