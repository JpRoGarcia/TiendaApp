const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); // Importa tus rutas de productos
const cartRoutes = require('./routes/cartRoutes'); // Importa tus rutas de carrito

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rutas para productos
app.use('/api/products', productRoutes);

// Rutas para el carrito
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
