const express = require('express');
const user = require('../controllers/UserController');
const auth = require('../controllers/AuthController');
const viewsRoutes = require('./views');

const router = express.Router();

module.exports = () => {
  router.get('/verify/:hash', user.verifyHash);
  router.post("/authorize", user.generateToken);
  router.get('/reset/:hash', auth.verifyResetLink);
  viewsRoutes(router);
  return router;
};
