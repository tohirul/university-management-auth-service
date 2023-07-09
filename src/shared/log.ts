import path from 'path';
import process from 'process';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf, prettyPrint } = format;

const custom__format = printf(
  ({ level, message, label, timestamp }): string => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `[${date.toDateString()} ${hour}:${minutes}:${seconds}] [${label}] ${level}: ${message}`;
  }
);

const checkInfo = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Tohirul' }),
    timestamp(),
    custom__format,
    prettyPrint()
  ),

  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'log',
        'winston',
        'success',
        'success-%DATE%.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

const checkError = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'Tohirul' }),
    timestamp(),
    custom__format,
    prettyPrint()
  ),

  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'log',
        'winston',
        'error',
        'error-%DATE%.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export default { checkInfo, checkError };
