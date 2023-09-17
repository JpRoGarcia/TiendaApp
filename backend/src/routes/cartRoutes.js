// productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getAllProducts);

// Get a product by SKU
router.get('/:sku', productController.getProductBySKU);

// Sell a product (update available quantity)
router.post('/sell/:sku', productController.sellProduct);

module.exports = router;
