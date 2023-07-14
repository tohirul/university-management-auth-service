import { SortOrder } from 'mongoose';
import paginationHelpers from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../types/common.types';
import { IPaginationOptions } from '../../../types/pagination.types';
import { AcademicDepartmentSearchableFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilter,
} from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const createAcademicDepartmentInDb = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  return (await AcademicDepartment.create(payload)).populate('academicFaculty');
};

const getAllAcademicDepartmentsFromDb = async (
  filters: IAcademicDepartmentFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[] | null>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const conditions = [];

  if (searchTerm) {
    conditions.push({
      $or: AcademicDepartmentSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    conditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const searchConditions =
    conditions.length > 0
      ? {
          $and: conditions,
        }
      : {};

  const total = await AcademicDepartment.countDocuments();
  const result = await AcademicDepartment.find(searchConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartmentFromDb = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  return await AcademicDepartment.findById(id);
};

const updateAcademicDepartmentInDb = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  return await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('academicFaculty');
};

const deleteAcademicDepartmentFromDb = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  return await AcademicDepartment.findByIdAndDelete(id).populate(
    'academicFaculty'
  );
};

const AcademicDepartmentService = {
  createAcademicDepartmentInDb,
  getAllAcademicDepartmentsFromDb,
  getSingleDepartmentFromDb,
  deleteAcademicDepartmentFromDb,
  updateAcademicDepartmentInDb,
};
export default AcademicDepartmentService;
