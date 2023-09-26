// cartController.js
const Cart = require('../models/Cart');
const RulesManager = require('../Rules/RulesManager');
const rulesManager = new RulesManager();
const cart = new Cart();

// const NormalPricingRule = require('../Rules/NormalPricingRule');
// const SpecialDiscountPricingRule = require('../Rules/SpecialDiscountPricingRule');
// const WeightPricingRule = require('../Rules/WeightPricingRule');

// Agregar un producto al carrito
function addToCart(req, res) {
  const { product, counter } = req.body;
  //const productType = product.sku.substring(0, 2);
  let totalPrice = 0;

  try {
    precio = rulesManager.aplicarRegla(product, counter)
    totalPrice = cart.addItem(product, counter, precio);
  } catch (error) {
    return res.status(400).json({ message: 'SKU de producto no válido' });
  }

  // switch (productType) {
  //   case 'EA':
  //     const pricingRuleEA = new NormalPricingRule();  
  //     precio = pricingRuleEA.calculatePrice(product, counter)
  //     totalPrice = cart.addItem(product, counter, precio);
  //     break;
  //   case 'WE':
  //     const pricingRuleWE = new WeightPricingRule();
  //     precio = pricingRuleWE.calculatePrice(product, counter)
  //     totalPrice = cart.addItem(product, counter, precio);
  //     break;
  //   case 'SP':
  //     const pricingRuleSP = new SpecialDiscountPricingRule();
  //     precio = pricingRuleSP.calculatePrice(product, counter)
  //     totalPrice = cart.addItem(product, counter, precio);
  //     break;
  //   default:
  //     return res.status(400).json({ message: 'SKU de producto no válido' });
  // }

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
