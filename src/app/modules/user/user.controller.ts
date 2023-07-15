import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import UserService from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { ...data } = req.body;
    const result = await UserService.createUserInDb(data);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User successfully created',
      data: result,
    });
  }
);
const UserController = {
  createUser,
};

export default UserController;
