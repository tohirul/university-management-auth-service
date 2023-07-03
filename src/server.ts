import http from 'http';
import mongoose from 'mongoose';

import { log } from './app/utility/logger';
import app from './app';
import config from './config';
import { dbConnect } from './dbConnect';

const PORT = config.port;
let server: http.Server;
const toggleServer = async (): Promise<void> => {
  try {
    dbConnect();
    server = app.listen(PORT, () => {
      log.info(`Server is breathing on ${PORT}`);
    });
  } catch (error) {
    log.error(error);
  }
};
process.on('SIGINT', async () => {
  try {
    if (server) {
      server.close();
    }
    await mongoose.disconnect();
    log.warn('Server and database connection will be closed');
    process.exit(0);
  } catch (error) {
    log.info(error);
    process.exit(1);
  }
});

toggleServer();
