const OrderRepo = require('../../repositories/OrderRepository');

class Food {
  async create(order, user) {
    try {
      const food = await OrderRepo.count(user._id);
      console.log(food);

      return Promise.resolve();
    } catch (err) {
      console.log(err);
      global.logger.error(err);
      return Promise.reject();
    }
  }
}

module.exports = Food;
