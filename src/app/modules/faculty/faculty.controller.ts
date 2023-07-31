import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination.constants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FacultyFilterableFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import FacultyService from './faculty.service';

const getFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await FacultyService.getFacultyFromDb(id);
    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty was successfully retrieved',
      data: result,
    });
  }
);

const getAllFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(req.query, FacultyFilterableFields) as IFacultyFilters;
    const paginationOptions = pick(req.query, paginationFields);
    const result = await FacultyService.getAllFacultyFromDb(
      filters,
      paginationOptions
    );
    sendResponse<IFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Faculties have been successfully retrieved',
      meta: result.meta,
      data: result.data,
    });
  }
);

const updateFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await FacultyService.updateFacultyInDb(id, updatedData);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty updated successfully',
      data: result,
    });
  }
);

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFacultyFromDb(id);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

const FacultyController = {
  getFaculty,
  getAllFaculty,
  updateFaculty,
  deleteFaculty,
};

export default FacultyController;
