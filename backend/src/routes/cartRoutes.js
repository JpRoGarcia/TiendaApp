const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/contents', cartController.getCartContents);
router.post('/add', cartController.addToCart);
router.delete('/remove/:sku', cartController.removeFromCart);

module.exports = router;
