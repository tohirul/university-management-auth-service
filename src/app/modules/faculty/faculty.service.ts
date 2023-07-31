import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import paginationHelpers from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../types/common.types';
import { IPaginationOptions } from '../../../types/pagination.types';
import User from '../user/user.model';
import { FacultySearchableFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import Faculty from './faculty.model';
import updateEmbeded from './faculty.update.embed';

const getFacultyFromDb = async (id: string): Promise<IFaculty | null> => {
  return await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty');
};

const getAllFacultyFromDb = async (
  filters: IFacultyFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const conditions = [];

  if (searchTerm) {
    conditions.push({
      $or: FacultySearchableFields.map(field => ({
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

  const result = await Faculty.find(searchConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments(searchConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateFacultyInDb = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const exists = await Faculty.findOne({ id });

  if (!exists) throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  const { name, ...facultyData } = payload;
  let updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  if (name && Object.keys(name).length) {
    updatedFacultyData = updateEmbeded(name, updatedFacultyData, 'name');
  }
  return await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  })
    .populate('academicDepartment')
    .populate('academicFaculty');
};

const deleteFacultyFromDb = async (id: string): Promise<IFaculty | null> => {
  const faculty = await Faculty.findOne({ id });

  if (!faculty) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deletedFaculty = await Faculty.findOneAndDelete({ id }, { session });

    if (!deletedFaculty) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete faculty');
    }

    // Assuming you have a related User model that needs to be deleted
    await User.deleteOne({ id }).session(session);

    await session.commitTransaction();
    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    // End the session after either commit or rollback
    session.endSession();
  }
};

const FacultyService = {
  getFacultyFromDb,
  getAllFacultyFromDb,
  updateFacultyInDb,
  deleteFacultyFromDb,
};

export default FacultyService;
