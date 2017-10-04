const authController = require('../controllers/AuthController');

module.exports = (router) => {
  router.get('*', authController.home);
  return router;
};
