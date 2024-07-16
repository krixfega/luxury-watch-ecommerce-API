const PaymentSchema = require('./paymentSchema');

class PaymentRepository {
  async createPayment(paymentData) {
    return await PaymentSchema.create(paymentData);
  }

  async getPaymentById(id) {
    return await PaymentSchema.findByPk(id);
  }

  async updatePayment(reference, paymentData) {
    const payment = await PaymentSchema.findOne({ where: { reference } });
    if (payment) {
      return await payment.update(paymentData);
    }
    return null;
  }
}

module.exports = new PaymentRepository();