import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination.constants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterFilterableFields } from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './academicSemester.interface';
import AcademicSemesterService from './academicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { ...data } = req.body;
    const result = await AcademicSemesterService.createSemesterInDb(data);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester successfully created',
      data: result,
    });
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(
      req.query,
      AcademicSemesterFilterableFields
    ) as IAcademicSemesterFilter;
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AcademicSemesterService.getAllSemestersFromDb(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All semesters have been successfully retrieved.',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await AcademicSemesterService.getSingleSemesterFromDb(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester successfully retrieved.',
      data: result,
    });
  }
);

const updateSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await AcademicSemesterService.updateSemesterFromDb(
      id,
      updatedData
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester updated successfully',
      data: result,
    });
  }
);

const deleteSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await AcademicSemesterService.deleteSemesterFromDb(id);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester deleted successfully',
      data: result,
    });
  }
);

const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
export default AcademicSemesterController;
