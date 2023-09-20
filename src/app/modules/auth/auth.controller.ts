import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const authLogin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  console.info(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
  });
});

const AuthContoller = {
  authLogin,
};
export default AuthContoller;
