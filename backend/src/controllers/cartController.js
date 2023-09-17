// cartController.js
const Cart = require('../models/Cart');
const cart = new Cart();

// Agregar un producto al carrito
function addToCart(req, res) {
  const { product, quantity } = req.body;
  const productType = product.sku.substring(0, 2);
  let totalPrice = 0;

  switch (productType) {
    case 'EA':
      totalPrice = cart.addNormalProduct(product, quantity);
      break;
    case 'WE':
      totalPrice = cart.addWeightProduct(product, quantity);
      break;
    case 'SP':
      totalPrice = cart.addSpecialDiscountProduct(product, quantity);
      break;
    default:
      return res.status(400).json({ message: 'SKU de producto no válido' });
  }

  res.status(200).json({ message: 'Producto agregado al carrito', totalPrice });
}

// Eliminar un producto del carrito por SKU
function removeFromCart(req, res) {
  const { sku } = req.params;
  cart.removeItemBySku(sku);
  res.status(200).json({ message: 'Producto eliminado del carrito' });
}

// Obtener el contenido del carrito y su precio total
function getCartContents(req, res) {
  const cartContents = cart.getCartContents();
  const totalPrice = cart.calculateTotalPrice();
  res.status(200).json({ cartContents, totalPrice });
}

module.exports = {
  addToCart,
  removeFromCart,
  getCartContents,
};
