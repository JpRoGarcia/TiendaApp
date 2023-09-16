const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Obtener un producto por SKU
router.get('/:sku', productController.getProductBySku);

// Vender un producto (actualizar la cantidad disponible)
router.post('/sell/:sku', productController.sellProduct);

module.exports = router;
