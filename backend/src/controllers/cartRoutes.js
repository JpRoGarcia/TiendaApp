const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addToCart);
router.delete('/remove/:sku', cartController.removeFromCart);
router.get('/contents', cartController.getCartContents);
router.post('/checkout', cartController.checkout);

module.exports = router;
