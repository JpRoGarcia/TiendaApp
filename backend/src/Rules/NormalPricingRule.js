// NormalPricingRule.js
const PricingRule = require('./PricingRule');

class NormalPricingRule extends PricingRule {
  calculatePrice(product, quantity) {
    return product.price * quantity;
  }
}

module.exports = NormalPricingRule;

