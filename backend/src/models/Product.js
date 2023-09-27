class Product {
  constructor(sku, name, description, quantity, price, image) {
    this.sku = sku;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    this.image = image
  }


  sell(cantidad) {
    if (this.quantity >= cantidad) {
      this.quantity -= cantidad;
      return true; 
    }
    return false; 
  }
}

module.exports = Product;
