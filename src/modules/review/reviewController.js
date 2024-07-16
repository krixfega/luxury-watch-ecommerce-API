const ReviewRepository = require('./reviewRepository');

class ReviewController {
  async addReview(req, res) {
    try {
      const review = await ReviewRepository.createReview({
        productId: req.body.productId,
        userId: req.user.id,
        rating: req.body.rating,
        comment: req.body.comment,
      });
      res.status(201).send(review);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async getReviewsByProduct(req, res) {
    try {
      const reviews = await ReviewRepository.getReviewsByProductId(req.params.productId);
      res.send(reviews);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async updateReview(req, res) {
    try {
      const review = await ReviewRepository.updateReview(req.params.reviewId, {
        rating: req.body.rating,
        comment: req.body.comment,
      });
      if (!review) {
        return res.status(404).send({ error: 'Review not found' });
      }
      res.send(review);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async deleteReview(req, res) {
    try {
      const isDeleted = await ReviewRepository.deleteReview(req.params.reviewId);
      if (!isDeleted) {
        return res.status(404).send({ error: 'Review not found' });
      }
      res.send({ message: 'Review deleted' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

module.exports = new ReviewController();