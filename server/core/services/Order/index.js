const getHours = require('date-fns/get_hours');
const setHours = require('date-fns/set_hours');
const isWithinRange = require('date-fns/is_within_range');
const OrderRepo = require('../../repositories/OrderRepository');
const { SHIFT, STATUS } = require('../../Strings');

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
           you can order for ${this.getNextShift(shift)} shift
            from ${timeLine.start} to ${timeLine.end}`);
      }
      const orders = await OrderRepo.getOrdersInRange(user._id, timeLine.start, timeLine.end);
      if (orders.length > Order.getLimit()) {
        return Promise.reject(
          `Your limitation for ${shift} shift has finished, 
          you can order for ${Order.getNextShift(shift)}
          from ${timeLine.start} to ${timeLine.end}
          `,
        );
      }
      return OrderRepo.create({
        shift,
        user_id: user._id,
        food_id: order.food_id,
      });
    } catch (err) {
      return Promise.reject();
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
}

module.exports = Order;
