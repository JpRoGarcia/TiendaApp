const PriceRuleInterface = require('./PriceRuleInterface');

// Clase base que implementa la interfaz ReglaPrecio
function BasePriceRule() { }

BasePriceRule.prototype = Object.create(PriceRuleInterface);

function SpecialDiscountRule() { }

SpecialDiscountRule.prototype = Object.create(BasePriceRule.prototype);

SpecialDiscountRule.prototype.es_aplicable = function (sku) {
  return sku.startsWith('SP');
};

SpecialDiscountRule.prototype.calcular_total = function (cantidad, precio) {
  const unidadesPorDescuento = 3;
  const descuentoPorUnidad = 0.2;
  const maxdescuentoPorUnidad = 0.5

  let precioTotal = cantidad * precio;

  const numeroDescuentos = cantidad/unidadesPorDescuento;
  let descuento = descuentoPorUnidad*numeroDescuentos;
  if(descuento > maxdescuentoPorUnidad){
    descuento = maxdescuentoPorUnidad;
  }

  return precioTotal*(1 - descuento);
};

module.exports = SpecialDiscountRule;
