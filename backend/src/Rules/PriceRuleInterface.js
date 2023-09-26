const InterfazReglaPrecio = {
    es_aplicable: function (sku) {
      throw new Error('Método es_aplicable debe ser implementado.');
    },
    calcular_total: function (cantidad, precio) {
      throw new Error('Método calcular_total debe ser implementado.');
    },
  };
  
  module.exports = InterfazReglaPrecio;