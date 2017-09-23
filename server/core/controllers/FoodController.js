const FoodService = require('../services/Food');
const FoodRepo = require('../repositories/FoodRepository');

module.exports = {

  create(req, res) {
    const food = new FoodService();
    food.create({ ...req.body, created_by: req.user._id })
      .then(data => res.status(201).json(data))
      .catch((reason) => {
        if (typeof reason === 'object') {
          return res.boom.badImplementation(reason.message);
        }
        return res.boom.badRequest(null, { message: reason });
      });
  },

  index(req, res) {
    FoodRepo.all()
      .then(foods => res.json(foods))
      .catch(() => res.boom.badImplementation());
  },

  show({ params: { id } }, res) {
    FoodRepo.findOne({ _id: id })
      .then(food => res.json(food))
      .catch(() => res.boom.badImplementation());
  },

  destroy({ params: { id } }, res) {
    FoodRepo.destroy(id)
      .then(() => res.end())
      .catch(() => res.boom.badImplementation());
  },
  update({ params: { id }, body }, res) {
    FoodRepo.update({ _id: id }, body)
      .then(() => res.end())
      .catch(() => res.boom.badImplementation());
  },
};
