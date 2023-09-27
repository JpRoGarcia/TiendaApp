const PriceRuleInterface = require('./PriceRuleInterface');

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

module.exports = WeightPricingRule;

