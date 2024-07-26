const jwt = require('jsonwebtoken');
require('dotenv').config();

class TokenService {
  generateAccessToken(user) {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '15m', // Access token expires in 15 minutes
    });
  }

  generateRefreshToken(user) {
    return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d', // Refresh token expires in 7 days
    });
  }

  verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  }
}

module.exports = new TokenService();