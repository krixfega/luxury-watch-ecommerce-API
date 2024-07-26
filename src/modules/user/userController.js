const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('./userRepository');
const TokenService = require('../../services/tokenService');
require('dotenv').config();

const tokenBlacklist = new Set();

class UserController {
  async register(req, res) {
    const { username, email, password, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await UserRepository.createUser({ username, email, password: hashedPassword, isAdmin });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserRepository.getUserByEmail(email);
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send({ error: 'Invalid email or password' });
      }

      const accessToken = TokenService.generateAccessToken(user);
      const refreshToken = TokenService.generateRefreshToken(user);

      // Store the refresh token in the database
      await UserRepository.saveRefreshToken(user.id, refreshToken);

      res.send({
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async getUserProfile(req, res) {
    res.send(req.user);
  }

  async refreshToken(req, res) {
    const { token } = req.body;

    if (!token) {
      return res.status(401).send({ error: 'Refresh token is required' });
    }

    try {
      const decoded = TokenService.verifyRefreshToken(token);
      const refreshToken = await UserRepository.getRefreshToken(token);

      if (!refreshToken) {
        return res.status(401).send({ error: 'Invalid refresh token' });
      }

      const user = await UserRepository.getUserById(decoded.id);
      const newAccessToken = TokenService.generateAccessToken(user);
      const newRefreshToken = TokenService.generateRefreshToken(user);

      await UserRepository.saveRefreshToken(user.id, newRefreshToken);
      await UserRepository.deleteRefreshToken(token);

      res.send({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      res.status(401).send({ error: 'Invalid refresh token' });
    }
  }

  async logout(req, res) {
    const { token } = req.body;

    try {
      await UserRepository.deleteRefreshToken(token);
      res.send({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
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