const jwt = require('jsonwebtoken');
const UserRepository = require('../modules/user/userRepository');
require('dotenv').config();

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserRepository.findUserById(decoded.id);

    if (!user || !user.isAdmin) {
      throw new Error('Not authorized as admin');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403).send({ error: 'Admin privileges required' });
  }
};

module.exports = adminAuth;