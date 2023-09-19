// productController.js
const Product = require('../models/Product');

// Simulated database for products (you can use a real database here)
const productsDB = [
  new Product('EA001', 'Producto 1', 'Descripción del Producto 1', 10, 10.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'),
  new Product('EA002', 'Producto 2', 'Descripción del Producto 2', 5, 19.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80'),
  // Add more products here
];

// Get all products
function getAllProducts(req, res) {
  res.status(200).json(productsDB);
}

// Get a product by SKU
function getProductBySKU(req, res) {
  const { sku } = req.params;
  const product = productsDB.find((p) => p.sku === sku);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
}

// Sell a product (update available quantity)
function sellProduct(req, res) {
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
}

module.exports = {
  getAllProducts,
  getProductBySKU,
  sellProduct,
};

