class Product {
  constructor(sku, name, description, quantity, price, image) {
    this.sku = sku;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    this.image = image
  }

  // Método para reducir la cantidad de unidades disponibles al vender
  sell() {
    if (this.quantity > 0) {
      this.quantity --;
      return true; // Éxito en la venta
    }
    return false; // No hay suficientes unidades disponibles
  }
}

module.exports = Product;
