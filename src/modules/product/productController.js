const ProductRepository = require('./productRepository');
const NotificationService = require('../../services/notificationService');

class ProductController {
  async createProduct(req, res) {
    try {
      const product = await ProductRepository.createProduct(req.body);
      // Notify all users about the new product
      // In a real application, we'd fetch all users from the database
      const users = await UserRepository.getAllUsers(); 
      users.forEach(user => {
        NotificationService.sendNewProductNotification(user, product);
      });
      res.status(201).send(product);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await ProductRepository.getAllProducts();
      res.send(products);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await ProductRepository.getProductById(req.params.id);
      if (!product) {
        return res.status(404).send({ error: 'Product not found' });
      }
      res.send(product);
    } catch (error) {
      res.status(400).send({ error: error.message });
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
      res.status(400).send({ error: error.message });
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
      res.status(400).send({ error: error.message });
    }
  }
}

module.exports = new ProductController();