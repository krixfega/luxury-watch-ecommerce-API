const UserRepository = require('../user/userRepository');
const ProductRepository = require('../product/productRepository');
const OrderRepository = require('../order/orderRepository');

class AdminController {
  // User Management
  async getAllUsers(req, res) {
    try {
      const users = await UserRepository.getAllUsers();
      res.send(users);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await UserRepository.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.send(user);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const isDeleted = await UserRepository.deleteUser(req.params.id);
      if (!isDeleted) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.send({ message: 'User deleted' });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  // Product Management
  async createProduct(req, res) {
    try {
      const product = await ProductRepository.createProduct(req.body);
      res.status(201).send(product);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await ProductRepository.updateProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).send({ error: 'Product not found' });
      }
      res.send(product);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const isDeleted = await ProductRepository.deleteProduct(req.params.id);
      if (!isDeleted) {
        return res.status(404).send({ error: 'Product not found' });
      }
      res.send({ message: 'Product deleted' });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  // Order Management
  async getAllOrders(req, res) {
    try {
      const orders = await OrderRepository.getAllOrders();
      res.send(orders);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const order = await OrderRepository.updateOrder(req.params.id, req.body);
      if (!order) {
        return res.status(404).send({ error: 'Order not found' });
      }
      res.send(order);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async getSalesAnalytics(req, res) {
    try {
      const totalSales = await OrderRepository.getTotalSales();
      const totalOrders = await OrderRepository.getTotalOrders();
      const salesByProduct = await OrderRepository.getSalesByProduct();
      const salesByCategory = await OrderRepository.getSalesByCategory();
      const monthlySales = await OrderRepository.getMonthlySales();
      res.send({
        totalSales,
        totalOrders,
        salesByProduct,
        salesByCategory,
        monthlySales,
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async getUserAnalytics(req, res) {
    try {
      const totalUsers = await UserRepository.getTotalUsers();
      const userSignUpsPerMonth = await UserRepository.getUserSignUpsPerMonth();
      res.send({
        totalUsers,
        userSignUpsPerMonth,
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

module.exports = new AdminController();