const OrderModel = require('../model/Order');

class OrderRepository {

  static count(user) {
    return OrderModel.count({ user_id: user });
  }

  static create(food) {
    return OrderModel.create(food);
  }

  static all() {
    return OrderModel.find({});
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
