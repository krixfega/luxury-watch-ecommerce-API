const ProductSchema = require('./productSchema');

class ProductRepository {
  async createProduct(productData) {
    return await ProductSchema.create(productData);
  }

  async getAllProducts() {
    return await ProductSchema.findAll();
  }

  async getProductById(id) {
    return await ProductSchema.findByPk(id);
  }

  async updateProduct(id, productData) {
    const product = await ProductSchema.findByPk(id);
    if (product) {
      return await product.update(productData);
    }
    return null;
  }

  async deleteProduct(id) {
    const product = await ProductSchema.findByPk(id);
    if (product) {
      await product.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new ProductRepository();