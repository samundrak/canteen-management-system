const UserRepo = require('../repositories/UserRepository');

module.exports = {
  id: 'users',
  show({ params: { id } }, res) {
    UserRepo.find({ _id: id })
      .then(user => res.json(user))
      .catch(() => res.boom.badImplementation());
  },
  index(req, res) {
    UserRepo.all({})
      .then(users => res.json(users))
      .catch((err) => {
        global.logger.error(err.message);
        return res.boom.badImplementation();
      });
  },
  update({user, params: { id }, body }, res) {
    delete body._id;
    console.log( user._id +'' === id)
    if(user.role === 'user' && user._id +'' !== id) {
      return res.boom.unauthorized();
    }
    UserRepo.update({ _id: id }, body)
      .then(() => res.status(204).send())
      .catch((error) => {
        global.logger.error(error);
        res.boom.badImplementation();
      });
  },
};
