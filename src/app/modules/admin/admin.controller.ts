import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination.constants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AdminDataFilterableFields } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';
import AdminService from './admin.service';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AdminDataFilterableFields) as IAdminFilters;
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmin(filters, paginationOptions);

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Admins were successfully retrieved',
    meta: result.meta,
    data: result.data,
  });
});

const getAdminById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await AdminService.getAdminById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin successfully retrieved',
      data: result,
    });
  }
);

const updateAdminById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await AdminService.updateAdminById(id, updatedData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin updated successfully',
      data: result,
    });
  }
);

const deleteAdmin = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await AdminService.deleteAdmin(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin deleted successfully',
      data: result,
    });
  }
);

const AdminController = {
  getAllAdmin,
  getAdminById,
  deleteAdmin,
  updateAdminById,
};

export default AdminController;
