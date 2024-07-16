const ReviewSchema = require('./reviewSchema');

class ReviewRepository {
  async createReview(reviewData) {
    return await ReviewSchema.create(reviewData);
  }

  async getReviewsByProductId(productId) {
    return await ReviewSchema.findAll({ where: { productId } });
  }

  async updateReview(reviewId, reviewData) {
    const review = await ReviewSchema.findByPk(reviewId);
    if (review) {
      return await review.update(reviewData);
    }
    return null;
  }

  async deleteReview(reviewId) {
    const review = await ReviewSchema.findByPk(reviewId);
    if (review) {
      await review.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new ReviewRepository();