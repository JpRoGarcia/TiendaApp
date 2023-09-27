
const Product = require('../models/Product');

const productsDB = [
  new Product('EA001', 'Zapatos', 'Nike', 10, 20, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'),
  new Product('EA002', 'Reloj', 'Da la Hora', 5, 70, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80'),
  new Product('WE001', 'Guacate', 'El oro verde', 500, 30, 'https://media.istockphoto.com/id/147442784/es/foto/aguacate-con-hojas.jpg?s=1024x1024&w=is&k=20&c=RctLrB-hkpnzCFr0LchwiH9fxVMVxr9dpVT2YhmDcq8='),
  new Product('SP001', 'Blue Label', 'Un elisir', 50, 10, 'https://exitocol.vtexassets.com/arquivos/ids/19151674-1200-auto?v=638247780841930000&width=1200&height=auto&aspect=true'),

];

function getAllProducts(req, res) {
  res.status(200).json(productsDB);
}

function getProductBySKU(req, res) {
  const { sku } = req.params;
  const product = productsDB.find((p) => p.sku === sku);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
}

function addToCart(req, res) {
  const { sku } = req.params;
  const { counter } = req.body;
 
  const product = productsDB.find((p) => p.sku === sku);

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  if (product.sell(counter)) {
    res.status(200).json({ message: 'Producto(s) agregado(s) al carrito exitosamente' });
  } else {
    res.status(400).json({ message: 'No se pudo agregar el producto al carrito' });
  }
}

module.exports = {
  getAllProducts,
  getProductBySKU,
  addToCart,
};

