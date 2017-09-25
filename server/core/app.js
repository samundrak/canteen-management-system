/* eslint-disable no-console, no-param-reassign */
/* global require, global */
require('dotenv').config();
const express = require('express');
const path = require('path');
const appConfig = require('./../../config/app');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const Logger = require('./services/Logger');
const boom = require('express-boom');
const _ = require('lodash');
const Promise = require('bluebird');
const helper = require('./utils/helper');
const winstonLogsDisplay = require('winston-logs-display');

const app = express();
app.set('env', process.env.NODE_ENV);
global.config = () => (appConfig);
global.events = new events.EventEmitter();
global.helper = helper;
global.Promsie = Promise;
global.logger = new Logger().setEnv(app.get('env')).get();
global.app = app;
global.db = require('./database/mongo');
let auth = require('./../../config/auth');
let routes = require('./routes');
const apiRoutes = require('./routes/api');
const authApiRoutes = require('./routes/api/auth');

require('./events');

routes = routes(app);
auth = auth();
const port = appConfig.app.port;

app.use(cors());
app.use(boom());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth.initialize());
app.use(express.static(path.join(__dirname, '../../public')));

if (process.env.NODE_ENV !== 'production') {
  winstonLogsDisplay(app, global.logger);
}
app.use((req, res, next) => {
  req.error = (data, httpCode) => {
    if (typeof data === 'string') {
      data = {
        message: data,
      };
    }
    data = Object.assign(data || {}, {});
    return res.status(httpCode || 500).send(data);
  };

  req.success = (data, httpCode) => {
    data = Object.assign(data || {}, {});
    return res.status(httpCode || 200).send(data);
  };

  return next();
});
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.use('/api', apiRoutes);
app.use('/api/auth', auth.authenticate(), authApiRoutes);
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
app.use((err, req, res, next) => {
  if (app.get('env') === 'development') {
    if (req.path.indexOf('api') > -1) {
      return res
        .status(err.status || 500)
        .json({
          message: err.message,
          error: err,
        });
    }
    return res
      .status(err.status || 500)
      .render('error', {
        message: err.message,
        error: err,
      });
  }
  if (req.path.indexOf('api') > -1) {
    return res
      .status(err.status || 500)
      .json({
        message: err.message,
        error: err,
      });
  }
  return res
    .status(err.status || 500)
    .render('error', {
      message: 'Some Error Occurred',
      error: '',
    });
});

const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});

// // NOTE: event name is camelCase as per node convention
process.on("unhandledRejection", (reason, promise) => {
  // See Promise.onPossiblyUnhandledRejection for parameter documentation
  console.log(reason.status);
});

// NOTE: event name is camelCase as per node convention
process.on("rejectionHandled", (promise) => {
  // See Promise.onUnhandledRejectionHandled for parameter documentation
  console.log(promise);
});
process.on('uncaughtException', console.log);

