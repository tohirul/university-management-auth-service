import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IManagementDepartment } from './managementDepartment.interface';
import ManagementDepartmentService from './managementDepartment.service';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      data
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully created management department',
      data: result,
    });
  }
);

const ManagementDepartmentController = {
  createManagementDepartment,
};

export default ManagementDepartmentController;
