const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./modules/user/userRoutes');
const productRoutes = require('./modules/product/productRoutes');
const orderRoutes = require('./modules/order/orderRoutes');
const paymentRoutes = require('./modules/payment/paymentRoutes');
const reviewRoutes = require('./modules/review/reviewRoutes');
const wishlistRoutes = require('./modules/wishlist/wishlistRoutes');
const adminRoutes = require('./modules/admin/adminRoutes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware should be the last middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});