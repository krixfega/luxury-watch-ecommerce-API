const express = require('express');
const ProductController = require('./productController');
const auth = require('../../middlewares/auth');
const adminAuth = require('../../middlewares/adminAuth');

const router = express.Router();

// Search and filtering
router.get('/search', ProductController.searchProducts);
router.get('/filter', ProductController.filterProducts);

// User can view products
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);

// Admin can perform CRUD operations on products
router.post('/', adminAuth, ProductController.createProduct);
router.put('/:id', adminAuth, ProductController.updateProduct);
router.delete('/:id', adminAuth, ProductController.deleteProduct);

module.exports = router;