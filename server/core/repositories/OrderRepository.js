const OrderModel = require('../model/Order');

class OrderRepository {
  static getOrdersInRange(userId, start, end) {
    return OrderModel
      .find({
        user_id: userId,
        created_at: {
          $lt: end,
          $gt: start,
        },
      });
  }

  static create(food) {
    return OrderModel.create(food);
  }

  static all(clause = {}) {
    return OrderModel.find(clause);
  }

  static findOne(clause, ...spread) {
    return OrderModel.findOne(clause, ...spread);
  }

  static update(condition, update) {
    return OrderModel.update(condition, update);
  }

  static destroy(id) {
    return OrderModel.find({ _id: id }).remove();
  }
}

module.exports = OrderRepository;
