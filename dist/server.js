'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const process_1 = __importDefault(require('process'));
const app_1 = __importDefault(require('./app'));
const config_1 = __importDefault(require('./config'));
const dbConnect_1 = __importDefault(require('./dbConnect'));
const PORT = config_1.default.port;
let server;
const toggleServer = async () => {
  try {
    (0, dbConnect_1.default)();
    server = app_1.default.listen(PORT, () => {
      console.info(`Server is breathing on ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
process_1.default.on('SIGTERM', () => {
  console.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
process_1.default.on('unhandledRejection', error => {
  if (server) {
    server.close(() => {
      console.error(error);
      process_1.default.exit(1);
    });
  } else {
    process_1.default.exit(1);
  }
});
process_1.default.on('uncaughtException', error => {
  console.error(error);
  process_1.default.exit(1);
});
toggleServer();
