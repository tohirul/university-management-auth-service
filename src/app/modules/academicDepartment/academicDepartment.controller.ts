import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination.constants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentFilterableFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilter,
} from './academicDepartment.interface';
import AcademicDepartmentService from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { ...data } = req.body;
    const result = await AcademicDepartmentService.createAcademicDepartmentInDb(
      data
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department was created successfully',
      data: result,
    });
  }
);

const getAllAcademicDepartments = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(
      req.query,
      AcademicDepartmentFilterableFields
    ) as IAcademicDepartmentFilter;
    const paginationOptions = pick(req.query, paginationFields);
    const result =
      await AcademicDepartmentService.getAllAcademicDepartmentsFromDb(
        filters,
        paginationOptions
      );

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Academic Departments were successfully retrieved',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const result = await AcademicDepartmentService.getSingleDepartmentFromDb(
      id
    );
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Departed successfully retrieved',
      data: result,
    });
  }
);

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await AcademicDepartmentService.updateAcademicDepartmentInDb(
      id,
      updateData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department updated successfully',
      data: result,
    });
  }
);

const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result =
      await AcademicDepartmentService.deleteAcademicDepartmentFromDb(id);
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department deleted successfully',
      data: result,
    });
  }
);

const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  deleteAcademicDepartment,
  updateAcademicDepartment,
};
export default AcademicDepartmentController;
