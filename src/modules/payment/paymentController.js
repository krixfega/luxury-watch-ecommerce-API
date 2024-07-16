const axios = require('axios');
const PaymentRepository = require('./paymentRepository');
const NotificationService = require('../../services/notificationService');
require('dotenv').config();

class PaymentController {
  async initializePayment(req, res) {
    const { amount, orderId } = req.body;

    try {
      // Initialize payment with Paystack
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email: req.user.email,
          amount: amount * 100, // Paystack accepts amount in kobo
          reference: `ref_${Math.random().toString(36).substr(2, 9)}`,
          callback_url: 'http://localhost:3001/api/payments/verify'
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      const payment = await PaymentRepository.createPayment({
        userId: req.user.id,
        orderId,
        amount,
        status: 'pending',
        reference: response.data.data.reference,
      });

      res.status(201).send({
        payment,
        authorization_url: response.data.data.authorization_url,
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async verifyPayment(req, res) {
    const { reference } = req.query;

    try {
      // Verify payment with Paystack
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      if (response.data.data.status === 'success') {
        const payment = await PaymentRepository.updatePayment(reference, {
          status: 'successful',
        });

        NotificationService.sendSuccessfulPaymentNotification(req.user, payment);

        res.send({ message: 'Payment successful' });
      } else {
        res.status(400).send({ message: 'Payment verification failed' });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async handleWebhook(req, res) {
    const secret = process.env.PAYSTACK_SECRET_KEY;

    // Validate event
    const hash = require('crypto')
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash === req.headers['x-paystack-signature']) {
      // Retrieve the request's body
      const event = req.body;

      // Handle the event
      if (event.event === 'charge.success') {
        const { reference } = event.data;

        PaymentRepository.updatePayment(reference, {
          status: 'successful',
        })
          .then((payment) => {
            NotificationService.sendSuccessfulPaymentNotification(req.user, payment);
            res.send({ message: 'Payment status updated successfully' });
          })
          .catch((error) => {
            res.status(500).send({ error: error.message });
          });
      } else {
        res.send({ message: 'Event not handled' });
      }
    } else {
      res.status(400).send({ message: 'Invalid signature' });
    }
  }
}

module.exports = new PaymentController();