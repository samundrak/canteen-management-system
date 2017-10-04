const Model = require('../server/core/model/Food');

class Food {
  static getData() {
    return [
      { name: 'Chowmein', price: 50 },
      { name: 'Newari Khaja set', price: 50 },
      { name: 'Sajha Khana', price: 80 },
      { name: 'Omlet', price: 20 },
      { name: 'Samosa', price: 15 },
    ];
  }

  run(callback) {
    Model.collection.insert(Food.getData(), (error, result) => {
      if (error) {
         console.error('Error while seeding');
         return callback(error, null);
      }

      console.log('Seeding done.');
      return callback(null, true);
    });
  }
}

module.exports = Food;
