// cartController.js
const Cart = require('../models/Cart');
const RulesManager = require('../Rules/RulesManager');
const rulesManager = new RulesManager();
const cart = new Cart();

function addToCart(req, res) {
  const { product, counter } = req.body;
  let totalPrice = 0;

  try {
    precio = rulesManager.aplicarRegla(product, counter)
    totalPrice = cart.addItem(product, counter, precio);
  } catch (error) {
    return res.status(400).json({ message: 'SKU de producto no válido' });
  }
  res.status(200).json({ message: 'Producto agregado al carrito', totalPrice });
}

function removeFromCart(req, res) {
  const { sku } = req.params;
  cart.removeItemBySku(sku);
  res.status(200).json({ message: 'Producto eliminado del carrito' });
  
}
  
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
