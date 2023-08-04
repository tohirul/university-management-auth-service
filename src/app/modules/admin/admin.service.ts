import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import paginationHelpers from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../types/common.types';
import { IPaginationOptions } from '../../../types/pagination.types';
import User from '../user/user.model';
import { adminDataSearchableFields } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';
import Admin from './admin.model';
import updateEmbeded from './admin.update.embed';

const getAllAdmin = async (
  filters: IAdminFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const conditions = [];
  if (searchTerm) {
    conditions.push({
      $$or: adminDataSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filtersData).length)
    conditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

  const searchConditions = conditions.length > 0 ? { $and: conditions } : {};

  const result = await Admin.find(searchConditions)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(searchConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAdminById = async (id: string): Promise<IAdmin | null> => {
  return await Admin.findOne({ id }).populate('managementDepartment');
};

const updateAdminById = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const exists = await Admin.findOne({ id });

  if (!exists) throw new ApiError(httpStatus.BAD_REQUEST, 'Admin not found');

  const { name, ...adminData } = payload;

  let updatedAdminData: Partial<IAdmin> = { ...adminData };

  if (name && Object.keys(name).length)
    updatedAdminData = updateEmbeded(name, updatedAdminData, 'name');

  return await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  }).populate('managementDepartment');
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const exists = await Admin.findOne({ id });
  if (!exists) throw new ApiError(httpStatus.BAD_REQUEST, 'Admin not found');

  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    const deletedAdmin = await Admin.findOneAndDelete({ id }, { session });

    if (!deletedAdmin)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete admin');

    await User.deleteOne({ id }).session(session);

    await session.commitTransaction();
    return deletedAdmin;
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const AdminService = {
  getAllAdmin,
  updateAdminById,
  getAdminById,
  deleteAdmin,
};

export default AdminService;
