const OrderSchema = require('./orderSchema');

class OrderRepository {
  async createOrder(orderData) {
    return await OrderSchema.create(orderData);
  }

  async getOrderById(id) {
    return await OrderSchema.findByPk(id);
  }

  async updateOrder(id, orderData) {
    const order = await OrderSchema.findByPk(id);
    if (order) {
      return await order.update(orderData);
    }
    return null;
  }

  async deleteOrder(id) {
    const order = await OrderSchema.findByPk(id);
    if (order) {
      await order.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new OrderRepository();