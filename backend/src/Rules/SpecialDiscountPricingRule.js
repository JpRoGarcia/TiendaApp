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
  // Implementa el cálculo del precio total
  // (Incluyendo la lógica de descuento especial, si es necesario)
  const unidadesPorDescuento = 3; // Cada 3 unidades, se aplica el descuento
  const descuentoPorUnidad = 0.2; // 20% de descuento

  let precioTotal = cantidad * precio;

  // Aplicar el descuento por cada 3 unidades hasta un máximo del 50%
  const descuentoMaximo = precio * (unidadesPorDescuento * descuentoPorUnidad);
  const maximoDescuento = precioTotal * 0.5;

  while (cantidad >= unidadesPorDescuento) {
    if (precioTotal >= descuentoMaximo + maximoDescuento) {
      // Se ha alcanzado el descuento máximo permitido
      break;
    }

    // Aplicar el descuento por cada 3 unidades
    precioTotal -= descuentoMaximo;
    cantidad -= unidadesPorDescuento;
  }
  return precioTotal;
};


// SpecialDiscountPricingRule.js
// const PricingRule = require('./PricingRule');

// class SpecialDiscountPricingRule extends PricingRule {
//   calculatePrice(product, quantity) {
//     const normalPrice = product.price * quantity;
//     const maxDiscountPrice = (product.price * quantity) / 2; 

//     if (quantity >= 3) {
//       const discountedPrice = normalPrice - (Math.floor(quantity / 3) * (0.20 * normalPrice));
//       return Math.max(discountedPrice, maxDiscountPrice); 
//     } else {
//       return normalPrice;
//     }
//   }
// }

module.exports = SpecialDiscountRule;
