const UserSchema = require('./userSchema');

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
}

module.exports = new UserRepository();