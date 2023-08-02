import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import paginationHelpers from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../types/common.types';
import { IPaginationOptions } from '../../../types/pagination.types';
import { ManagementDepartmentSearchableFields } from './managementDepartment.constant';
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface';
import ManagementDepartment from './managementDepartment.model';

const createManagementDepartment = async (
  data: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  return await ManagementDepartment.create(data);
};

const getAllManagementDepartments = async (
  filters: IManagementDepartmentFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const conditions = [];

  if (searchTerm) {
    conditions.push({
      $or: ManagementDepartmentSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    conditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

  const searchConditions = conditions.length > 0 ? { $and: conditions } : {};

  const result = await ManagementDepartment.find(searchConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ManagementDepartment.countDocuments(searchConditions);

  return {
    meta: { page, limit, total },
    data: result,
  };
};
const getManagementDepartmentById = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const exist = await ManagementDepartment.findById(id);
  if (!exist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Management Department not found');
  return await ManagementDepartment.findById(id);
};

const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const exist = await ManagementDepartment.findById(id);
  if (!exist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Management Department not found');
  return await ManagementDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};

const deleteManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const exist = await ManagementDepartment.findById(id);
  if (!exist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Management Department not found');
  return await ManagementDepartment.findByIdAndDelete(id);
};

const ManagementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartments,
  getManagementDepartmentById,
  updateManagementDepartment,
  deleteManagementDepartment,
};

export default ManagementDepartmentService;
