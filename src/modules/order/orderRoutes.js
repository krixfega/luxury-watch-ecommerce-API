const express = require('express');
const OrderController = require('./orderController');
const auth = require('../../middlewares/auth');
const adminAuth = require('../../middlewares/adminAuth');

const router = express.Router();

// User can view and track their orders
router.get('/history', auth, OrderController.getOrderHistory);
router.get('/track/:id', auth, OrderController.trackOrder);

// Admin can perform CRUD operations on orders
router.post('/', adminAuth, OrderController.createOrder);
router.put('/:id', adminAuth, OrderController.updateOrder);
router.delete('/:id', adminAuth, OrderController.deleteOrder);

module.exports = router;