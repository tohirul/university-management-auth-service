import mongoose from 'mongoose';

import { log } from './app/utility/logger';
import config from './config/index';

const URI = config.database_url as string;

const dbConnect = async (): Promise<void> => {
  try {
    if (!URI) {
      log.error('No URI found in the configuration');
      process.exit(1);
    }
    await mongoose
      .connect(URI)
      .then(() => log.info('Database Connection Established'));
  } catch (error) {
    log.error((error as Error).message);
  }
};

export { dbConnect };
