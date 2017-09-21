const winston = require('winston');
const path = require('path');

class Logger {

  constructor() {
    const date = new Date();
    this.loggerFileName = `${date.getYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    this.path = 'storage/logs';
  }

  setEnv(env) {
    this.env = env;
    return this;
  }

  getEnv() {
    return this.env;
  }

  get() {
    const logger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
          filename: `${path.join(this.path, this.loggerFileName)}.log`,
        }),
      ],
    });
    if (this.getEnv() === 'production') {
      logger.handleExceptions(new winston.transports.File({
        filename: path.join(this.path, 'exceptions.log'),
      }));
    }
    return logger;
  }
}

module.exports = Logger;
