const jwt = require('jsonwebtoken');
const UserRepository = require('../modules/user/userRepository');
const UserController = require('../modules/user/userController');
require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (UserController.isTokenBlacklisted(token)) {
      throw new Error('Token is invalidated');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserRepository.findUserById(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;