import { NextFunction, Request, Response } from 'express';
import AcademicSemesterService from './academicSemester.service';

const createSemester = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { ...data } = req.body;
    const result = await AcademicSemesterService.createSemesterInDb(data);

    res.status(200).json({
      success: true,
      message: 'Academic Semester successfully created.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const AcademicSemesterController = {
  createSemester,
};
export default AcademicSemesterController;
