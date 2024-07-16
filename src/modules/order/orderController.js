const OrderRepository = require('./orderRepository');
const NotificationService = require('../../services/notificationService');

class OrderController {
  async createOrder(req, res) {
    const order = await OrderRepository.createOrder({
      userId: req.user.id,
      ...req.body,
    });
    NotificationService.sendOrderPlacedNotification(req.user, order);
    res.status(201).send(order);
  }

  async getOrderById(req, res) {
    const order = await OrderRepository.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.send(order);
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
    NotificationService.sendNotification(req.user, `Your order ${req.params.id} has been deleted.`);
    res.send({ message: 'Order deleted' });
  }

  async generateInvoice(req, res) {
    const order = await OrderRepository.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    // Logic to generate invoice
    NotificationService.sendInvoiceNotification(req.user, order);
    res.send({ message: 'Invoice generated' });
  }
}

module.exports = new OrderController();