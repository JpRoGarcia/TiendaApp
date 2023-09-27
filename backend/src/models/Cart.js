class Cart {
    constructor() {
      this.items = [];
    }

    addItem(product, quantity, precio) {
      const existingItem = this.items.find((item) => item.product.sku === product.sku);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.precio += precio;
      } else {
        const newItem = {
          product,
          quantity,
          precio
        };
        this.items.push(newItem);
      }
    }

    removeItemBySku(sku) {
      this.items = this.items.filter((item) => item.product.sku !== sku);
    }

    getCartContents() {
      return this.items;
    }

    calculateTotalPrice() {
      let totalPrice = 0;
      let quantity = 0;
      
      for (const item of this.items) {
        const productPrice = item.precio;
        const itemQuantity = item.quantity;

        totalPrice += productPrice;
        quantity += itemQuantity;
      }

      return [totalPrice, quantity];
    }
  }
  
  module.exports = Cart;
  