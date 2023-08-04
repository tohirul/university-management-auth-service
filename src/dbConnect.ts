import mongoose from 'mongoose';
import process from 'process';

import config from './config/index';

const URI = config.database_url as string;

const dbConnect = async (): Promise<void> => {
  try {
    if (!URI) {
      console.log('No URI found in the configuration');
      process.exit(1);
    }
    await mongoose.connect(URI).then(() => {
      console.log('Database Connection Established');
    });
  } catch (error) {
    console.log((error as Error).message);
  }
};

export default dbConnect;
