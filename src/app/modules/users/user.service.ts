import config from '../../../config';
import ApiError from '../../../errors/ApiError';
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
    throw new ApiError(400, 'User creation failed');
  }
  return user;
};

const UserService = {
  createUserInDb,
};

export default UserService;
