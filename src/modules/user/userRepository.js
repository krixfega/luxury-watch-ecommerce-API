const UserSchema = require('./userSchema');
const RefreshTokenSchema = require('./refreshTokenSchema');
const { Sequelize } = require('sequelize'); 

class UserRepository {
  async createUser(userData) {
    return await UserSchema.create(userData);
  }

  async findUserByEmail(email) {
    return await UserSchema.findOne({ where: { email } });
  }

  async findUserById(id) {
    return await UserSchema.findByPk(id);
  }

  async getAllUsers() {
    return await UserSchema.findAll();
  }

  async updateUser(id, userData) {
    const user = await UserSchema.findByPk(id);
    if (user) {
      return await user.update(userData);
    }
    return null;
  }

  async deleteUser(id) {
    const user = await UserSchema.findByPk(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }

  async getTotalUsers() {
    return await UserSchema.count();
  }

  async getUserSignUpsPerMonth() {
    return await UserSchema.findAll({
      attributes: [
        [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt')), 'month'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'signUps'],
      ],
      group: [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt'))],
    });
  }

  async getUserByEmail(email) {
    return await UserSchema.findOne({ where: { email } });
  }

  async saveRefreshToken(userId, refreshToken) {
    return await RefreshTokenSchema.create({ userId, token: refreshToken });
  }

  async getRefreshToken(token) {
    return await RefreshTokenSchema.findOne({ where: { token } });
  }

  async deleteRefreshToken(token) {
    return await RefreshTokenSchema.destroy({ where: { token } });
  }
}

module.exports = new UserRepository();