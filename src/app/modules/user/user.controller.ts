import { NextFunction, Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import UserService from './user.service';

const createUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;
    const result = await UserService.createUserInDb(user);
    res.status(200).json({
      success: true,
      message: 'Successfully created user',
      user: result,
    });
  } catch (error) {
    next(error);
  }
};
const UserController = {
  createUser,
};

export default UserController;
