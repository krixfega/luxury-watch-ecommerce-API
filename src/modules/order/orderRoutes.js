const express = require('express');
const OrderController = require('./orderController');
const auth = require('../../middlewares/auth');
const adminAuth = require('../../middlewares/adminAuth');

const router = express.Router();

// User can create and view orders
router.post('/', auth, OrderController.createOrder);
router.get('/:id', auth, OrderController.getOrderById);

// Admin can perform CRUD operations on orders
router.get('/', adminAuth, OrderController.getAllOrders);
router.put('/:id', adminAuth, OrderController.updateOrder);
router.delete('/:id', adminAuth, OrderController.deleteOrder);

module.exports = router;