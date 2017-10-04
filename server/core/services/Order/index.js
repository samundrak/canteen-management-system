const getHours = require('date-fns/get_hours');
const setHours = require('date-fns/set_hours');
const format = require('date-fns/format');
const pluck = require('lodash/fp/pluck');
const pick = require('lodash/fp/pick');
const uniq = require('lodash/fp/uniq');
const find = require('lodash/fp/find');
const isWithinRange = require('date-fns/is_within_range');
const OrderRepo = require('../../repositories/OrderRepository');
const FoodRepo = require('../../repositories/FoodRepository');
const UserRepo = require('../../repositories/UserRepository');

const { SHIFT, STATUS } = require('../../Strings');

const DATE_FORMAT = 'YYYY/M/D h:m:s a';
class Order {
  static getLimit() {
    return 10;
  }

  static getTimeline() {
    return {
      [SHIFT.MORNING]: {
        start: setHours(new Date(), 6),
        end: setHours(new Date(), 11),
      },
      [SHIFT.DAY]: {
        start: setHours(new Date(), 12),
        end: setHours(new Date(), 16),
      },
      [SHIFT.NIGHT]: {
        start: setHours(new Date(), 17),
        end: setHours(new Date(), 24),
      },
    };
  }

  static isInRange(shift) {
    const currentTime = new Date();
    const start = Order.getTimeline()[shift].start;
    const end = Order.getTimeline()[shift].end;
    return isWithinRange(currentTime, start, end);
  }

  static getNextShift(shift) {
    const shifts = [SHIFT.MORNING, SHIFT.DAY, SHIFT.NIGHT];
    const currentShiftIndex = shifts.indexOf(shift);
    if (currentShiftIndex >= shifts.length - 1) {
      return shifts[0];
    }

    return shifts[currentShiftIndex + 1];
  }

  async create(order, user) {
    const { shift } = order;
    const timeLine = Order.getTimeline()[shift];
    try {
      if (!Order.isInRange(shift)) {
        return Promise.reject(
          `Order time for this ${shift} shift is closed,
           you can order for ${Order.getNextShift(shift)} shift
            from ${format(timeLine.start, DATE_FORMAT)} to ${format(timeLine.end, DATE_FORMAT)}`);
      }
      const orders = await OrderRepo.getOrdersInRange(user._id, timeLine.start, timeLine.end);
      if (orders.length > Order.getLimit()) {
        return Promise.reject(
          `Your limitation for ${shift} shift has finished,
          you can order for ${Order.getNextShift(shift)}
          from ${format(timeLine.start, DATE_FORMAT)} to ${format(timeLine.end, DATE_FORMAT)}
          `,
        );
      }
      return OrderRepo.create({
        shift,
        user_id: user._id,
        food_id: order.food_id,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async delete(orderId, user) {
    try {
      const order = await OrderRepo.findOne({
        _id: orderId,
        user_id: user._id,
      });

      if (order.status !== STATUS.PENDING) {
        return Promise.reject('You can\'t remove this order as it has been already processed.');
      }
      const shift = order.shift;
      const timeline = Order.getTimeline()[shift];
      const currentTime = new Date();
      if (getHours(currentTime) > getHours(timeline.end)) {
        return Promise.reject('You can\'t remove order now as it might have processed.');
      }

      return OrderRepo.destroy(orderId);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async all(user) {
    try {
      const clause = {};
      if(user.role === 'user') {
        clause.user_id = user._id;
      }
      const orders =  await OrderRepo.all(clause);
      const foodsIds = uniq(pluck('food_id')(orders)) || [];
      const foods = await FoodRepo.in(foodsIds);
      const usersIds = uniq(pluck('user_id')(orders)) || [];
      const users = await UserRepo.in(usersIds);

      const newOrders = orders.map((order) => Object.assign({}, order.toObject(), {
          created_at: format(order.created_at, DATE_FORMAT),
           food: foods.find(food => food._id + '' === order.food_id),
           user: pick(['email','first_name','last_name'])
            (users.find(user => user._id + '' === order.user_id)),
         }));
      return Promise.resolve(newOrders);
    }catch(error) {
      return Promise.reject(error);
    }
  }
}

module.exports = Order;
