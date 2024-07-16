const express = require('express');
const ProductController = require('./productController');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth, ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', auth, ProductController.updateProduct);
router.delete('/:id', auth, ProductController.deleteProduct);

module.exports = router;