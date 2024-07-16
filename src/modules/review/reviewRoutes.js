const express = require('express');
const ReviewController = require('./reviewController');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth, ReviewController.addReview);
router.get('/:productId', ReviewController.getReviewsByProduct);
router.put('/:reviewId', auth, ReviewController.updateReview);
router.delete('/:reviewId', auth, ReviewController.deleteReview);

module.exports = router;