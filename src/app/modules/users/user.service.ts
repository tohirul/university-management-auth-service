import config from '../../../config';
import { IUser } from './user.interface';
import User from './user.model';
import { sendUserId } from './user.utility';

const createUserInDb = async (info: IUser): Promise<IUser | null> => {
  const id = await sendUserId();
  info.id = id;

  if (!info.password) {
    info.password = config.default_user_pass as string;
  }
  const user = await User.create(info);
  if (!user) {
    throw new Error('User creation failed');
  }
  return user;
};

export default {
  createUserInDb,
};
