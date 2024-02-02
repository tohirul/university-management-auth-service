import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import jwtHelpers from '../../helpers/jwt.helper';

const authHandler =
  (...acceptedRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken)
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized to access this endpoint'
        );

      let verifiedUserData = null;
      verifiedUserData = jwtHelpers.verifyToken(
        accessToken,
        config.jwt.access_token as Secret
      );

      req.user = verifiedUserData;

      if (
        acceptedRoles.length &&
        !acceptedRoles.includes(verifiedUserData.role)
      )
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You must be authenticated to access this endpoint'
        );

      next();
    } catch (error) {
      next(error);
    }
  };

export default authHandler;
