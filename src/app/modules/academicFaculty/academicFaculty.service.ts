import { SortOrder } from 'mongoose';
import paginationHelpers from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../types/common.types';
import { IPaginationOptions } from '../../../types/pagination.types';
import { academicFacultySearchableFields } from './academicFaculty.constant';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createFacultyInDb = async (
  data: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  return await AcademicFaculty.create(data);
};

const getFacultyFromDb = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  return AcademicFaculty.findById(id);
};

const getAllAcademicFacultiesFromDb = async (
  filters: IAcademicFacultyFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const conditions = [];
  if (searchTerm) {
    conditions.push({
      $or: academicFacultySearchableFields.map(field => ({
        [field]: { $regex: searchTerm, options: 'i' },
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
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const searchConditions = conditions.length > 0 ? { $and: conditions } : {};
  const result = await AcademicFaculty.find(searchConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const AcademicFacultyService = {
  createFacultyInDb,
  getFacultyFromDb,
  getAllAcademicFacultiesFromDb,
};

export default AcademicFacultyService;
