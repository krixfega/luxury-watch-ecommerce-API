const Wishlist = require('./wishlistSchema');

class WishlistRepository {
  async addUserToWishlist(userId, productId) {
    return await Wishlist.create({ userId, productId });
  }

  async removeUserFromWishlist(userId, productId) {
    return await Wishlist.destroy({ where: { userId, productId } });
  }

  async getWishlistForUser(userId) {
    return await Wishlist.findAll({ where: { userId } });
  }
}

module.exports = new WishlistRepository();