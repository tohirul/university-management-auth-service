import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import UserService from './user.service';

const createStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudentInDb(student, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User successfully created',
      data: result,
    });
  }
);
const UserController = {
  createStudent,
};

export default UserController;
