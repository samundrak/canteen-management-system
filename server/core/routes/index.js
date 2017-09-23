const express = require('express');
const auth = require('../controllers/AuthController');
const viewsRoutes = require('./views');

const router = express.Router();

module.exports = () => {
  router.get('/verify/:hash', auth.verifyHash);
  router.post("/authorize", auth.generateToken);
  router.get('/reset/:hash', auth.verifyResetLink);
  viewsRoutes(router);
  return router;
};
