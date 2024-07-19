const express = require('express');
const AdminController = require('./adminController');
const adminAuth = require('../../middlewares/adminAuth');

const router = express.Router();

router.get('/users', adminAuth, AdminController.getAllUsers);
router.put('/users/:id', adminAuth, AdminController.updateUser);
router.delete('/users/:id', adminAuth, AdminController.deleteUser);

router.post('/products', adminAuth, AdminController.createProduct);
router.put('/products/:id', adminAuth, AdminController.updateProduct);
router.delete('/products/:id', adminAuth, AdminController.deleteProduct);

router.get('/orders', adminAuth, AdminController.getAllOrders);
router.put('/orders/:id', adminAuth, AdminController.updateOrderStatus);

module.exports = router;