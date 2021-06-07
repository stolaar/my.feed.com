const winston = require('winston');
const isEmpty = require("lodash.isempty")
const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

const formatter = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;

    return `${timestamp} [${level}]: ${message} ${
      typeof meta === 'object' && !isEmpty(meta) ? JSON.stringify(meta, null, 2) : ''
    }`;
  }),
);

class Logger {

  constructor() {
    const prodTransport = new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    });
    const transport = new winston.transports.Console({
      format: formatter,
    });
    this.logger = winston.createLogger({
      level: process.env.ENV === 'development' ? 'trace' : 'trace',
      levels: customLevels.levels,
      transports: [transport],
    });
    winston.addColors(customLevels.colors);
  }

  trace(msg, meta) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg, meta) {
    msg = typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg
    this.logger.debug(msg, meta);
  }

  info(msg, meta) {
    msg = typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg
    this.logger.info(msg, meta);
  }

  warn(msg, meta) {
    msg = typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg
    this.logger.warn(msg, meta);
  }

  error(msg, meta) {
    msg = typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg
    this.logger.error(msg, meta);
  }

  fatal(msg, meta) {
    this.logger.log('fatal', msg, meta);
  }
}

const logger = new Logger();

module.exports = logger
