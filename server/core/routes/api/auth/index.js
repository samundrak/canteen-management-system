const api = require('express').Router();
const user = require('../../../controllers/UserController');

api.get('/me', (req, res) => res.send(req.user));
api.post('/me', user.update);
module.exports = api;
//
