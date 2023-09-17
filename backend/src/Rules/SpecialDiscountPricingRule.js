// SpecialDiscountPricingRule.js
const PricingRule = require('./PricingRule');

class SpecialDiscountPricingRule extends PricingRule {
  calculatePrice(product, quantity) {
    const normalPrice = product.price * quantity;
    const maxDiscountPrice = (product.price * quantity) / 2; 
    
    if (quantity >= 3) {
      const discountedPrice = normalPrice - (Math.floor(quantity / 3) * (0.20 * normalPrice));
      return Math.max(discountedPrice, maxDiscountPrice); 
    } else {
      return normalPrice;
    }
  }
}

module.exports = SpecialDiscountPricingRule;
