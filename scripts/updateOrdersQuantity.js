const Product = require('../src/modules/product/productSchema'); // Correct path to Product model
const Order = require('../src/modules/order/orderSchema'); // Correct path to Order model

(async () => {
  try {
    const defaultProduct = await Product.findOne(); // Find a default product
    if (!defaultProduct) {
      throw new Error('No products found to set as default');
    }
    
    await Order.update(
      { quantity: 1 }, // Set a default quantity value
      { where: { quantity: null } }
    );
    
    console.log('Updated existing orders with default quantity');
  } catch (error) {
    console.error('Error updating orders:', error);
  }
})();