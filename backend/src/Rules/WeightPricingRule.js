const PriceRuleInterface = require('./PriceRuleInterface');

// Clase base que implementa la interfaz ReglaPrecio
function BasePriceRule() {}

BasePriceRule.prototype = Object.create(PriceRuleInterface);

function WeightPricingRule() {}

WeightPricingRule.prototype = Object.create(BasePriceRule.prototype);

WeightPricingRule.prototype.es_aplicable = function (sku) {
  return sku.startsWith('WE');
};

WeightPricingRule.prototype.calcular_total = function (cantidad, precio) {
  const precioPorKilogramo = precio / 1000;
  return cantidad * precioPorKilogramo;
};


// WeightPricingRule.js
// const PricingRule = require('./PricingRule');

// class WeightPricingRule extends PricingRule {
//   calculatePrice(product, quantity) {
//     return (product.price / 1000) * quantity; // Precio por kilogramo
//   }
// }

module.exports = WeightPricingRule;

