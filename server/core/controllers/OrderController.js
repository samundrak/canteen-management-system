const OrderRepo = require('../repositories/OrderRepository');
const OrderService = require('../services/Order');

module.exports = {
  create(req, res) {
    const orderService = new OrderService();
    return orderService.create(req.body, req.user)
      .then(food => res.status(201).json(food))
      .catch((err) => {
        if (typeof err === 'object') {
          global.logger.error(err);
          return res.boom.badImplementation();
        }

        return res.boom.badRequest(global.helper.cleanString(err));
      });
  },
  index(req, res) {
    return OrderRepo.all()
      .then(orders => res.json(orders))
      .catch(() => res.boom.badImplementation());
  },
  show({ params: { id } }, res) {
    return OrderRepo.findOne({ _id: id })
      .then(order => res.json(order))
      .catch(() => res.boom.badImplementation());
  },
  destroy({ params: { id }, user }, res) {
    const orderService = new OrderService();
    orderService.delete(id, user)
      .then(() => res.end())
      .catch((reason) => {
        if (typeof reason === 'object') {
          global.logger.error(reason);
          return res.boom.badImplementation();
        }

        return res.boom.badRequest(reason);
      });
  },
};
