//const OrderRepo = require('../repositories/OrderRepository');
const OrderService = require('../services/Order');

module.exports = {
  create(req, res) {
    res.send(200);
    const orderService = new OrderService();
    orderService.create(req.body, req.user);
  },
  index() {

  },
  show() {

  },
  destroy() {

  },
};
