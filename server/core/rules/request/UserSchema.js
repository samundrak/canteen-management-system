const Joi = require('joi');

module.exports = Joi.object().keys({
  first_name: Joi.string().min(3).max(30),
  last_name: Joi.string().min(3).max(30),
});
