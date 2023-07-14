import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination.constants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { IAcademicFaculty } from './academicFaculty.interface';
import AcademicFacultyService from './academicFaculty.service';

const createFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { ...createFacultyData } = req.body;
    const result = await AcademicFacultyService.createFacultyInDb(
      createFacultyData
    );
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty Created successfully',
      data: result,
    });
  }
);

const getFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await AcademicFacultyService.getFacultyFromDb(id);
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty successfully retrieved',
      data: result,
    });
  }
);

const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AcademicFacultyService.getAllAcademicFacultiesFromDb(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Academic Faculties retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const deleteFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await AcademicFacultyService.deleteFacultyFromDb(id);
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester deleted successfully',
      data: result,
    });
  }
);

const updateFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await AcademicFacultyService.updateFacultyInDb(
      id,
      updateData
    );
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty details updated successfully',
      data: result,
    });
  }
);

const AcademicFacultyController = {
  createFaculty,
  getFaculty,
  getAllAcademicFaculties,
  deleteFaculty,
  updateFaculty,
};
export default AcademicFacultyController;
