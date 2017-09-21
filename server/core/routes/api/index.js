const api = require('express').Router();
const auth = require('../../controllers/AuthController');
const user = require('../../controllers/UserController');
const requestValidator = require('../../middlewares/requestValidator');
const registerRequestSchema = require('../../rules/request/RegisterSchema');

api.post('/forgot-password', auth.forgotPassword);
api.post('/login', user.login);
api.post('/register', requestValidator(registerRequestSchema), user.register);
api.post('/new-password/:hash', auth.createNewPassword);
module.exports = api;
