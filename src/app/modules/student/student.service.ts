import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import paginationHelpers from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../types/common.types';
import { IPaginationOptions } from '../../../types/pagination.types';
import User from '../user/user.model';
import { StudentDataSearchableFields } from './student.constant';
import { IStudent, IStudentFilters } from './student.interface';
import Student from './student.model';
import updateEmbeded from './student.update.embed';

const getStudentFromDb = async (id: string): Promise<IStudent | null> => {
  return await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
};

const getAllStudentFromDb = async (
  filters: IStudentFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const conditions = [];
  if (searchTerm) {
    conditions.push({
      $or: StudentDataSearchableFields.map(field => ({
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

  const result = await Student.find(searchConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(searchConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateStudentInDb = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const exists = await Student.findOne({ id });

  if (!exists) throw new ApiError(httpStatus.NOT_FOUND, 'Student not found!');

  const { name, guardian, localGuardian, ...studentData } = payload;
  let updatedStudentData: Partial<IStudent> = { ...studentData };

  if (name && Object.keys(name).length)
    updatedStudentData = updateEmbeded(name, updatedStudentData, 'name');

  if (guardian && Object.keys(guardian).length)
    updatedStudentData = updateEmbeded(
      guardian,
      updatedStudentData,
      'guardian'
    );

  if (localGuardian && Object.keys(localGuardian).length)
    updatedStudentData = updateEmbeded(
      localGuardian,
      updatedStudentData,
      'localGuardian'
    );

  return await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
};

const deleteStudentFromDb = async (id: string): Promise<IStudent | null> => {
  const exists = await Student.findOne({ id });

  if (!exists) throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndDelete({ id }, { session });
    if (!deletedStudent)
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete student');
    await User.deleteOne({ id });

    session.commitTransaction();
    session.endSession();
    return deletedStudent;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

const StudentService = {
  getStudentFromDb,
  getAllStudentFromDb,
  updateStudentInDb,
  deleteStudentFromDb,
};
export default StudentService;
