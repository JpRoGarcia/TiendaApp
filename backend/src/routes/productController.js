const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Base de datos simulada para productos (puedes usar una base de datos real aquí)
const productsDB = [
  new Product('EA001', 'Producto 1', 'Descripción del Producto 1', 10, 10.99),
  new Product('EA002', 'Producto 2', 'Descripción del Producto 2', 5, 19.99),
  // Agrega más productos aquí
];

// Obtener todos los productos
router.get('/', (req, res) => {
  res.status(200).json(productsDB);
});

// Obtener un producto por SKU
router.get('/:sku', (req, res) => {
  const { sku } = req.params;
  const product = productsDB.find((p) => p.sku === sku);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Vender un producto (actualiza la cantidad disponible)
router.post('/sell/:sku', (req, res) => {
  const { sku } = req.params;
  const { quantityToSell } = req.body;

  const product = productsDB.find((p) => p.sku === sku);

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  if (product.sell(quantityToSell)) {
    res.status(200).json({ message: 'Venta exitosa' });
  } else {
    res.status(400).json({ message: 'No hay suficientes unidades disponibles' });
  }
});

module.exports = router;
