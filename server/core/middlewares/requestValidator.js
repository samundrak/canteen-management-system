module.exports = schema =>
  (req, res, next) => {
    const validation = global.helper.joi(req.body, schema, {
      abortEarly: false,
    });
    if (validation.status) {
      return next();
    }

    return res.boom.badData('Please check all fields.', { data: validation.messages });
  };
