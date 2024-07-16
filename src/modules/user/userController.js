const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('./userRepository');
const NotificationService = require('../../services/notificationService');
require('dotenv').config();

const tokenBlacklist = new Set();

class UserController {
  async register(req, res) {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await UserRepository.createUser({ username, email, password: hashedPassword });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    NotificationService.sendAccountCreatedNotification(user);
    res.status(201).send({ user, token });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await UserRepository.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    NotificationService.sendLoginNotification(user);
    res.send({ user, token });
  }

  async getUserProfile(req, res) {
    res.send(req.user);
  }

  async logout(req, res) {
    const token = req.header('Authorization').replace('Bearer ', '');
    tokenBlacklist.add(token);
    res.send({ message: 'Logged out successfully' });
  }

  isTokenBlacklisted(token) {
    return tokenBlacklist.has(token);
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    NotificationService.sendForgotPasswordNotification(user, resetToken);
    res.send({ message: 'Password reset email sent' });
  }
}

module.exports = new UserController();