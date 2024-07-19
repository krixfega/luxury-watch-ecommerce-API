const { Op } = require('sequelize');
const Product = require('./productSchema');

class ProductRepository {
  async getAllProducts() {
    return await Product.findAll();
  }

  async getProductById(id) {
    return await Product.findByPk(id);
  }

  async createProduct(productData) {
    return await Product.create(productData);
  }

  async updateProduct(id, productData) {
    const product = await Product.findByPk(id);
    if (product) {
      return await product.update(productData);
    }
    return null;
  }

  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      return true;
    }
    return false;
  }

  async searchProducts(query) {
    return await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
    });
  }

  async filterProducts(priceMin, priceMax, rating, category) {
    const filters = {};
    if (priceMin) filters.price = { [Op.gte]: parseFloat(priceMin) };
    if (priceMax) filters.price = { [Op.lte]: parseFloat(priceMax) };
    if (rating) filters.rating = { [Op.gte]: parseFloat(rating) };
    if (category) filters.category = { [Op.iLike]: `%${category}%` };

    return await Product.findAll({
      where: filters,
    });
  }
}

module.exports = new ProductRepository();