const Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string().required(),
  images: Joi.string(),
  description: Joi.string(),
  price: Joi.number().required(),
});
