// productRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Agregar un producto al carrito
router.post('/add', cartController.addToCart);

// Eliminar un producto del carrito por SKU
router.delete('/remove/:sku', cartController.removeFromCart);

// Obtener el contenido del carrito y su precio total
router.get('/contents', cartController.getCartContents);
module.exports = router;
