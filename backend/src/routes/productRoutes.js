const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:sku', productController.getProductBySKU); // Change this line to getProductBySKU
router.post('/sell/:sku', productController.sellProduct);

module.exports = router;
