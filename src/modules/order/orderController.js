const OrderRepository = require('./orderRepository');
const ProductRepository = require('../product/productRepository'); 
const NotificationService = require('../../services/notificationService');

class OrderController {
  async createOrder(req, res) {
    const { productId, quantity } = req.body;

    try {
      const product = await ProductRepository.getProductById(productId);
      if (!product) {
        return res.status(404).send({ error: 'Product not found' });
      }

      const totalAmount = product.price * quantity;

      const order = await OrderRepository.createOrder({
        userId: req.user.id,
        productId,
        quantity,
        totalAmount,
        status: 'pending',
      });

      NotificationService.sendOrderPlacedNotification(req.user, order);
      res.status(201).send(order);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async getOrderById(req, res) {
    const order = await OrderRepository.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.send(order);
  }

  async getAllOrders(req, res) {
    const orders = await OrderRepository.getAllOrders();
    res.send(orders);
  }

  async updateOrder(req, res) {
    const order = await OrderRepository.updateOrder(req.params.id, req.body);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    NotificationService.sendOrderStatusChangedNotification(req.user, order);
    res.send(order);
  }

  async deleteOrder(req, res) {
    const isDeleted = await OrderRepository.deleteOrder(req.params.id);
    if (!isDeleted) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.send({ message: 'Order deleted' });
  }
}

module.exports = new OrderController();