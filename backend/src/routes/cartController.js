const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

const cart = new Cart();

// Agregar un producto al carrito
const addToCart = (req, res) => {
  const { product, quantity } = req.body;
  // Aquí, verifica si el producto está disponible en suficiente cantidad antes de agregarlo al carrito
  const productInStock = Product.findProductBySku(product.sku);
  if (!productInStock || productInStock.quantity < quantity) {
    return res.status(400).json({ message: 'Producto no disponible en suficiente cantidad' });
  }
  cart.addItem(product, quantity);
  res.status(200).json({ message: 'Producto agregado al carrito' });
};

// Eliminar un producto del carrito por SKU
const removeFromCart = (req, res) => {
  const { sku } = req.params;
  cart.removeItemBySku(sku);
  res.status(200).json({ message: 'Producto eliminado del carrito' });
};

// Obtener el contenido del carrito y su precio total
const getCartContents = (req, res) => {
  const cartContents = cart.getCartContents();
  const totalPrice = cart.calculateTotalPrice();
  res.status(200).json({ cartContents, totalPrice });
};

// Realizar una compra (procesar el carrito y descontar unidades de productos)
const checkout = (req, res) => {
  // Implementa la lógica de procesamiento del carrito y descuento de unidades aquí
  // Puedes utilizar la instancia del carrito (cart) para obtener los productos y cantidades
  // y luego descontar las unidades de la base de datos de productos (si es necesario)
  // Recuerda validar que haya suficiente disponibilidad de productos antes de realizar la compra
  // Actualiza la lógica según tus necesidades específicas
  // Por ejemplo, podría ser necesario implementar el descuento especial aquí.

  // Una vez que la compra se ha procesado con éxito, puedes vaciar el carrito
  cart.emptyCart();
  res.status(200).json({ message: 'Compra realizada con éxito' });
};

module.exports = {
  addToCart,
  removeFromCart,
  getCartContents,
  checkout,
};
