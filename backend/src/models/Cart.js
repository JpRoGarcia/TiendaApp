class Cart {
    constructor() {
      this.items = [];
    }
  
    // Agregar un producto al carrito
    addItem(product, quantity, precio) {
      const existingItem = this.items.find((item) => item.product.sku === product.sku);

      if (existingItem) {
        // Si el producto ya existe en el carrito, simplemente aumenta la cantidad
        existingItem.quantity += quantity;
        existingItem.precio += precio;
      } else {
        // Si el producto no existe en el carrito, agrégalo como un nuevo elemento
        const newItem = {
          product,
          quantity,
          precio
        };
        this.items.push(newItem);
      }
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
      let quantity = 0;
      for (const item of this.items) {
        const productPrice = item.product.price;
        totalPrice += productPrice * item.quantity;
        quantity += item.quantity;
      }
      return [totalPrice, quantity];
    }
  }
  
  module.exports = Cart;
  