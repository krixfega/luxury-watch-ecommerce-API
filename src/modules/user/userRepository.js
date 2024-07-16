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
}

module.exports = new UserRepository();