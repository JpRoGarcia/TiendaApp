class Product {
  constructor(sku, name, description, quantity, price) {
    this.sku = sku;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
  }

  // Método para reducir la cantidad de unidades disponibles al vender
  sell(quantityToSell) {
    if (quantityToSell <= this.quantity) {
      this.quantity -= quantityToSell;
      return true; // Éxito en la venta
    }
    return false; // No hay suficientes unidades disponibles
  }
}

module.exports = Product;
