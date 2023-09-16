class Cart {
    constructor() {
      this.items = [];
    }
  
    // Agregar un producto al carrito
    addItem(product, quantity) {
      const item = {
        product,
        quantity,
      };
      this.items.push(item);
    }
  
    // Eliminar un producto del carrito por SKU
    removeItemBySku(sku) {
      this.items = this.items.filter((item) => item.product.sku !== sku);
    }
  
    // Obtener el contenido completo del carrito
    getCartContents() {
      return this.items;
    }
  
    // Calcular el precio total del carrito
    calculateTotalPrice() {
      let totalPrice = 0;
      for (const item of this.items) {
        const productPrice = item.product.price;
        totalPrice += productPrice * item.quantity;
      }
      return totalPrice;
    }
  }
  
  module.exports = Cart;
  