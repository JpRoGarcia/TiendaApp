const NormalPricingRule = require('./NormalPricingRule');
const SpecialDiscountPricingRule = require('./SpecialDiscountPricingRule');
const WeightPricingRule = require('./WeightPricingRule');

class RulesManager {
    constructor() {
      this.reglas = [
        new NormalPricingRule(),
        new WeightPricingRule(),
        new SpecialDiscountPricingRule(),
      ];
    }
  
    aplicarRegla(producto, cantidad) {
      for (const regla of this.reglas) {
        if (regla.es_aplicable(producto.sku)) {
          return regla.calcular_total(cantidad, producto.price);
        }
      }
      throw new Error('No se encontró una regla aplicable para el producto.');
    }
  }
  
  module.exports = RulesManager;