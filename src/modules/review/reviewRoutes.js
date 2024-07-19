const express = require('express');
const ReviewController = require('./reviewController');
const auth = require('../../middlewares/auth');
const adminAuth = require('../../middlewares/adminAuth');

const router = express.Router();

// User can create reviews
router.post('/', auth, ReviewController.addReview);
router.get('/:productId', ReviewController.getReviewsByProduct);

// Admin can perform CRUD operations on reviews
router.put('/:reviewId', adminAuth, ReviewController.updateReview);
router.delete('/:reviewId', adminAuth, ReviewController.deleteReview);

module.exports = router;