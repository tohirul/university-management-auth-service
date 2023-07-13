import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import paginationHelpers from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../types/common.types';
import { IPaginationOptions } from '../../../types/pagination.types';
import {
  academicSemesterSearchFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createSemesterInDb = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Inappropriate semester code');
  }
  return await AcademicSemester.create(payload);
};

const getAllSemestersFromDb = async (
  filters: IAcademicSemesterFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const conditions = [];
  if (searchTerm)
    conditions.push({
      $or: academicSemesterSearchFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });

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

  const searchConditions = conditions.length > 0 ? { $and: conditions } : {};

  const result = await AcademicSemester.find(searchConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemesterFromDb = async (
  id: string
): Promise<IAcademicSemester | null> => {
  return await AcademicSemester.findById(id);
};

const AcademicSemesterService = {
  createSemesterInDb,
  getAllSemestersFromDb,
  getSingleSemesterFromDb,
};

export default AcademicSemesterService;
