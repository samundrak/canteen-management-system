const FoodRepo = require('../../repositories/FoodRepository');

class Food {
  async create({ created_by, name, price, img = null }) {
    try {
      const food = await FoodRepo.findOne({ name });
      if (food) {
        return Promise.reject('A food with this name already exists.');
      }

      return await FoodRepo.create({ name, price, img, created_by });
    } catch (err) {
      global.logger.error(err);
      return Promise.reject();
    }
  }
}

module.exports = Food;
