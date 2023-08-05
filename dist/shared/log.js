'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = __importDefault(require('path'));
const process_1 = __importDefault(require('process'));
const winston_1 = require('winston');
const winston_daily_rotate_file_1 = __importDefault(
  require('winston-daily-rotate-file')
);
const { combine, timestamp, label, printf, prettyPrint } = winston_1.format;
const custom__format = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `[${date.toDateString()} ${hour}:${minutes}:${seconds}] [${label}] ${level}: ${message}`;
});
const checkInfo = (0, winston_1.createLogger)({
  level: 'info',
  format: combine(
    label({ label: 'Tohirul' }),
    timestamp(),
    custom__format,
    prettyPrint()
  ),
  transports: [
    new winston_1.transports.Console(),
    new winston_daily_rotate_file_1.default({
      filename: path_1.default.join(
        process_1.default.cwd(),
        'log',
        'winston',
        'success',
        'success-%DATE%.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '5d',
    }),
  ],
});
const checkError = (0, winston_1.createLogger)({
  level: 'error',
  format: combine(
    label({ label: 'Tohirul' }),
    timestamp(),
    custom__format,
    prettyPrint()
  ),
  transports: [
    new winston_1.transports.Console(),
    new winston_daily_rotate_file_1.default({
      filename: path_1.default.join(
        process_1.default.cwd(),
        'log',
        'winston',
        'error',
        'error-%DATE%.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '5d',
    }),
  ],
});
exports.default = { checkInfo, console: checkError };
