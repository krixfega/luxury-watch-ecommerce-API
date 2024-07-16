class NotificationService {
    static sendNotification(user, message) {
      console.log(`Notification to ${user.email}: ${message}`);
      // For production, we shall integrate with a real notification service
    }
  
    static sendAccountCreatedNotification(user) {
      this.sendNotification(user, 'Your account has been created successfully.');
    }
  
    static sendForgotPasswordNotification(user, resetToken) {
      const resetLink = `http://localhost:3001/reset-password?token=${resetToken}`;
      this.sendNotification(user, `Click the link to reset your password: ${resetLink}`);
    }
  
    static sendLoginNotification(user) {
      this.sendNotification(user, 'You have successfully logged in.');
    }
  
    static sendOrderPlacedNotification(user, order) {
      this.sendNotification(user, `Your order ${order.id} has been placed successfully.`);
    }
  
    static sendOrderStatusChangedNotification(user, order) {
      this.sendNotification(user, `The status of your order ${order.id} has changed to ${order.status}.`);
    }
  
    static sendNewProductNotification(user, product) {
      this.sendNotification(user, `A new product ${product.name} has been added to the store.`);
    }
  
    static sendSuccessfulPaymentNotification(user, payment) {
      this.sendNotification(user, `Your payment of ${payment.amount} for order ${payment.orderId} was successful.`);
    }
  
    static sendInvoiceNotification(user, order) {
      this.sendNotification(user, `Your invoice for order ${order.id} is ready.`);
    }
  }
  
  module.exports = NotificationService;