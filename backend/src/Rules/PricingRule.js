class PricingRule {
    constructor() {}
  
    calculatePrice(product, quantity) {
      throw new Error('Este método debe ser implementado por las clases hijas');
    }
  }
  
  module.exports = PricingRule;