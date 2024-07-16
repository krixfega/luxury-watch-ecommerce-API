const express = require('express');
const OrderController = require('./orderController');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth, OrderController.createOrder);
router.get('/:id', auth, OrderController.getOrderById);
router.put('/:id', auth, OrderController.updateOrder);
router.delete('/:id', auth, OrderController.deleteOrder);

module.exports = router;