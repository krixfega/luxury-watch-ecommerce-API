const OrderSchema = require('./orderSchema');
const ProductSchema = require('../product/productSchema');
const { Sequelize } = require('sequelize');

class OrderRepository {
  async createOrder(orderData) {
    return await OrderSchema.create(orderData);
  }

  async getOrderById(id) {
    return await OrderSchema.findByPk(id);
  }

  async getAllOrders() {
    return await OrderSchema.findAll();
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

  async getOrderHistory(userId) {
    return await OrderSchema.findAll({
      where: {
        userId,
      },
    });
  }

  async trackOrder(id, userId) {
    return await OrderSchema.findOne({
      where: {
        id,
        userId,
      },
    });
  }

  async getTotalSales() {
    return await OrderSchema.sum('totalAmount');
  }

  async getTotalOrders() {
    return await OrderSchema.count();
  }

  async getSalesByProduct() {
    return await OrderSchema.findAll({
      attributes: [
        'productId',
        [Sequelize.fn('SUM', Sequelize.col('totalAmount')), 'totalSales'],
      ],
      group: ['productId', 'product.id', 'product.name'],
      include: [{ model: ProductSchema, as: 'product', attributes: ['id', 'name'] }],
    });
  }

  async getSalesByCategory() {
    return await OrderSchema.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('totalAmount')), 'totalSales'],
      ],
      include: [{
        model: ProductSchema,
        as: 'product',
        attributes: ['category'],
      }],
      group: ['product.category', 'product.id'],
    });
  }

  async getMonthlySales() {
    return await OrderSchema.findAll({
      attributes: [
        [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('totalAmount')), 'totalSales'],
      ],
      group: [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt'))],
    });
  }
}

module.exports = new OrderRepository();