const PriceRuleInterface = require('./PriceRuleInterface');

// Clase base que implementa la interfaz ReglaPrecio
function BasePriceRule() {}

BasePriceRule.prototype = Object.create(PriceRuleInterface);

function NormalPricingRule() {}

NormalPricingRule.prototype = Object.create(BasePriceRule.prototype);

NormalPricingRule.prototype.es_aplicable = function (sku) {
  return sku.startsWith('EA');
};

NormalPricingRule.prototype.calcular_total = function (cantidad, precio) {
  return cantidad * precio;
};


// NormalPricingRule.js
/* const PricingRule = require('./PricingRule');

class NormalPricingRule extends PricingRule {
  calculatePrice(product, quantity) {
    return product.price * quantity;
  }
}*/

module.exports = NormalPricingRule; 

