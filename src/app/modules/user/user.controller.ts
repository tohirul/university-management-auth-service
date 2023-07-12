import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import UserService from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user } = req.body;
    const result = await UserService.createUserInDb(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User successfully created',
      data: result,
    });
    next();
  }
);
const UserController = {
  createUser,
};

export default UserController;
