const WishlistRepository = require('./wishlistRepository');

class WishlistController {
  async addUserToWishlist(req, res) {
    const { productId } = req.body;
    try {
      const wishlistEntry = await WishlistRepository.addUserToWishlist(req.user.id, productId);
      res.status(201).send(wishlistEntry);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async removeUserFromWishlist(req, res) {
    const { productId } = req.body;
    try {
      await WishlistRepository.removeUserFromWishlist(req.user.id, productId);
      res.send({ message: 'Removed from wishlist' });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async getWishlistForUser(req, res) {
    try {
      const wishlist = await WishlistRepository.getWishlistForUser(req.user.id);
      res.send(wishlist);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

module.exports = new WishlistController();