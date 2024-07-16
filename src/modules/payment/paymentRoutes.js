const express = require('express');
const PaymentController = require('./paymentController');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/initialize', auth, PaymentController.initializePayment);
router.get('/verify', auth, PaymentController.verifyPayment);
router.post('/webhook', PaymentController.handleWebhook);

module.exports = router;