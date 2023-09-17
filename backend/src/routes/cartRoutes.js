// productRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Agregar un producto al carrito
cartRouter.post('/add', cartController.addToCart);

// Eliminar un producto del carrito por SKU
cartRouter.delete('/remove/:sku', cartController.removeFromCart);

// Obtener el contenido del carrito y su precio total
cartRouter.get('/contents', cartController.getCartContents);
module.exports = router;
