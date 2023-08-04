import http from 'http';
import mongoose from 'mongoose';
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

process.on('SIGINT', async () => {
  handleServerShutdown('SIGINT');
});

process.on('SIGTERM', async () => {
  handleServerShutdown('SIGTERM');
});

process.on('unhandledRejection', async (error: Error) => {
  console.error('unhandledRejection', error);
  handleServerShutdown('unhandledRejection', error);
});

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  handleServerShutdown('uncaughtException', error);
});
const handleServerShutdown = async (eventName: string, error?: Error) => {
  console.warn(
    `Server received ${eventName} signal. Server connection will be closed.`
  );
  if (eventName === 'SIGINT') await mongoose.disconnect();
  try {
    if (server) {
      server.close(() => {
        if (error) {
          console.error(error);
        }
      });
    }
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

toggleServer();
