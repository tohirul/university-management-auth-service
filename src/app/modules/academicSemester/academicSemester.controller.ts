import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import AcademicSemesterService from './academicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { ...data } = req.body;
    const result = await AcademicSemesterService.createSemesterInDb(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester successfully created',
      data: result,
    });
    next();
  }
);

const AcademicSemesterController = {
  createSemester,
};
export default AcademicSemesterController;
