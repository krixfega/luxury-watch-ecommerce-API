const ProductRepository = require('./productRepository');

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await ProductRepository.getAllProducts();
      res.send(products);
    } catch (error) {
      res.status(500).send({ error: error.message });
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
      res.status(500).send({ error: error.message });
    }
  }

  async createProduct(req, res) {
    const { name, price, category, rating } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    try {
      const product = await ProductRepository.createProduct({
        name,
        price,
        category,
        rating,
        imageUrl,
      });

      res.status(201).send(product);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    const { name, price, category, rating } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    try {
      const product = await ProductRepository.updateProduct(req.params.id, {
        name,
        price,
        category,
        rating,
        imageUrl,
      });

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

  async searchProducts(req, res) {
    const { query } = req.query;
    try {
      const products = await ProductRepository.searchProducts(query);
      res.send(products);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async filterProducts(req, res) {
    const { priceMin, priceMax, rating, category } = req.query;
    try {
      const products = await ProductRepository.filterProducts(priceMin, priceMax, rating, category);
      res.send(products);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

module.exports = new ProductController();