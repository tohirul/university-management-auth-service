import mongoose from 'mongoose';
import process from 'process';

import config from './config/index';
import log from './shared/log';

const URI = config.database_url as string;

const dbConnect = async (): Promise<void> => {
  try {
    if (!URI) {
      log.checkError.error('No URI found in the configuration');
      process.exit(1);
    }
    await mongoose.connect(URI).then(() => {
      log.checkInfo.info('Database Connection Established');
    });
  } catch (error) {
    log.checkError.error((error as Error).message);
  }
};

export default dbConnect;
