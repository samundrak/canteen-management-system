const Joi = require('joi');
const { SHIFT } = require('../../Strings');

module.exports = Joi.object().keys({
  food_id: Joi.string().required(),
  shift: Joi.string().valid(SHIFT.MORNING, SHIFT.DAY, SHIFT.NIGHT).required(),
});
