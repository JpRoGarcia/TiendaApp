const PriceRuleInterface = require('./PriceRuleInterface');

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

module.exports = NormalPricingRule; 

