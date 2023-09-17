class PricingRule {
    // Constructor (puede estar vacío o incluir propiedades comunes)
    constructor() {}
  
    // Método para calcular el precio (debe ser implementado por las clases hijas)
    calculatePrice(product, quantity) {
      throw new Error('Este método debe ser implementado por las clases hijas');
    }
  }
  
  module.exports = PricingRule;