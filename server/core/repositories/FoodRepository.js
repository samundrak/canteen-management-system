const FoodModel = require('../model/Food');

class FoodRepository {
  static create(food) {
    return FoodModel.create(food);
  }

  static all() {
    return FoodModel.find({});
  }

  static findOne(clause, ...spread) {
    return FoodModel.findOne(clause, ...spread);
  }

  static update(condition, update) {
    return FoodModel.update(condition, update);
  }

  static destroy(id) {
    return FoodModel.find({ _id: id }).remove();
  }
}

module.exports = FoodRepository;
