const express = require('express');
const cors = require('cors'); // Import the cors middleware
const productRoutes = require('./src/routes/productRoutes'); // Importa tus rutas de productos
const cartRoutes = require('./src/routes/cartRoutes'); // Importa tus rutas de carrito

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('(: API de Tienda)');
})
// Rutas para productos
app.use('/api/products', productRoutes);

// Rutas para el carrito
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
