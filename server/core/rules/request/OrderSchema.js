const Joi = require('joi');

module.exports = Joi.object().keys({
  food_id: Joi.string().required(),
});
