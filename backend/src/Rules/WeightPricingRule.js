// WeightPricingRule.js
const PricingRule = require('./PricingRule');

class WeightPricingRule extends PricingRule {
  calculatePrice(product, quantity) {
    return (product.price / 1000) * quantity; // Precio por kilogramo
  }
}

module.exports = WeightPricingRule;

