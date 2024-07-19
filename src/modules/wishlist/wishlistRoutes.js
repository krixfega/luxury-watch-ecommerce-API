const express = require('express');
const WishlistController = require('./wishlistController');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth, WishlistController.addUserToWishlist);
router.delete('/', auth, WishlistController.removeUserFromWishlist);
router.get('/', auth, WishlistController.getWishlistForUser);

module.exports = router;