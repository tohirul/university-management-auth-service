import http from 'http';
import mongoose from 'mongoose';
import process from 'process';

import app from './app';
import config from './config';
import dbConnect from './dbConnect';
import log from './shared/log';

const PORT = config.port;
let server: http.Server;

const toggleServer = async (): Promise<void> => {
  try {
    dbConnect();
    server = app.listen(PORT, () => {
      log.checkInfo.info(`Server is breathing on ${PORT}`);
    });
  } catch (error) {
    log.checkError.error(error);
  }
};

process.on('SIGINT', async () => {
  handleServerShutdown('SIGINT');
});

process.on('SIGTERM', async () => {
  handleServerShutdown('SIGTERM');
});

process.on('unhandledRejection', async (error: Error) => {
  log.checkError.error('unhandledRejection', error);
  handleServerShutdown('unhandledRejection', error);
});

process.on('uncaughtException', (error: Error) => {
  log.checkError.error('Uncaught Exception:', error);
  handleServerShutdown('uncaughtException', error);
});
const handleServerShutdown = async (eventName: string, error?: Error) => {
  log.checkInfo.warn(
    `Server received ${eventName} signal. Server connection will be closed.`
  );
  if (eventName === 'SIGINT') await mongoose.disconnect();
  try {
    if (server) {
      server.close(() => {
        if (error) {
          log.checkError.error(error);
        }
      });
    }
    process.exit(0);
  } catch (error) {
    log.checkError.error(error);
    process.exit(1);
  }
};

toggleServer();
