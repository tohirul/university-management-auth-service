import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';

import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import jwtHelpers from '../../../helpers/jwt.helper';
import User from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  const user = new User();

  // * Check if User already exists
  const exists = await user.userExists(id);
  if (!exists) throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');

  const { id: userId, role: userRole, needsPasswordChange = true } = exists;
  // const passwordMatch = await bcrypt.compare(password, exists?.password);

  if (exists.password && !user.passwordMatch(password, exists.password))
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');

  const accessToken = jwtHelpers.createToken(
    { id: userId, role: userRole },
    config.jwt.access_token as Secret,
    config.jwt.access_token_expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id: userId, role: userRole },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const checkRefreshToken = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  let decoded_token = null;
  try {
    decoded_token = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { id: userId } = decoded_token;
  const user = new User();
  const existingUser = await user.userExists(userId);

  if (!existingUser)
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');

  const newAccessToken = jwtHelpers.createToken(
    { id: existingUser.id, role: existingUser.role },
    config.jwt.access_token as Secret,
    config.jwt.access_token_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const AuthService = {
  loginUser,
  checkRefreshToken,
};

export default AuthService;
