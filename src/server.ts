import http from 'http';
import process from 'process';

import app from './app';
import config from './config';
import dbConnect from './dbConnect';

const PORT = config.port;
let server: http.Server;

const toggleServer = async (): Promise<void> => {
  try {
    dbConnect();
    server = app.listen(PORT, () => {
      console.info(`Server is breathing on ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

process.on('SIGTERM', () => {
  console.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});

process.on('unhandledRejection', error => {
  if (server) {
    server.close(() => {
      console.error(error);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

toggleServer();
