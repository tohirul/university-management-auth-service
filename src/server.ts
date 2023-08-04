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
      console.log(`Server is breathing on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

process.on('SIGINT', async () => {
  handleServerShutdown('SIGINT');
});

process.on('SIGTERM', async () => {
  handleServerShutdown('SIGTERM');
});

process.on('unhandledRejection', async (error: Error) => {
  console.log('unhandledRejection', error);
  handleServerShutdown('unhandledRejection', error);
});

const handleServerShutdown = async (eventName: string, error?: Error) => {
  console.log(
    `Server received ${eventName} signal. Server connection will be closed.`
  );
  if (eventName === 'SIGINT') await mongoose.disconnect();
  try {
    if (server) {
      server.close(() => {
        if (error) {
          console.log(error);
        }
      });
    }
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

toggleServer();
