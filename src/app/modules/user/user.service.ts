import httpStatus from 'http-status';
import { startSession } from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { IAdmin } from '../admin/admin.interface';
import Admin from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import Faculty from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { IUser } from './user.interface';
import User from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utility';

const createStudentInDb = async (
  student: IStudent,
  userData: IUser
): Promise<IUser | null> => {
  if (!userData.password) {
    userData.password = config.default_student_pass as string;
  }

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  let data = null;
  const session = await startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    userData.id = id;
    student.id = id;

    const createdStudent = await Student.create([student], { session });
    if (!createdStudent.length)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    userData.student = createdStudent[0]._id;

    const createdUser = await User.create([userData], { session });
    if (!createdUser.length)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    data = createdUser[0];

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  if (data) {
    data = await User.findOne({ id: data.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return data;
};

const createFacultyInDb = async (
  faculty: IFaculty,
  userData: IUser
): Promise<IUser | null> => {
  if (!userData.password) {
    userData.password = config.default_faculty_pass as string;
  }
  userData.role = 'faculty';
  let data = null;
  const session = await startSession();

  try {
    session.startTransaction();
    const id = await generateFacultyId();
    userData.id = id;
    faculty.id = id;

    const createdFaculty = await Faculty.create([faculty], { session });
    if (!createdFaculty.length)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create faculty');
    userData.faculty = createdFaculty[0]._id;
    const createdUser = await User.create([userData], { session });
    if (!createdUser.length)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create user');
    data = createdUser[0];

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  if (data) {
    data = User.findOne({ id: data.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return data;
};

const createAdmin = async (
  admin: IAdmin,
  userData: IUser
): Promise<IUser | null> => {
  if (!userData.password)
    userData.password = config.default_admin_pass as string;

  userData.role = 'admin';

  let data = null;
  const session = await startSession();

  try {
    session.startTransaction();
    const id = await generateAdminId();
    userData.id = id;
    admin.id = id;

    const createdAdmin = await Admin.create([admin], { session });
    if (!createdAdmin.length)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create admin');
    userData.admin = createdAdmin[0]._id;

    const createdUser = await User.create([userData], { session });
    if (!createdUser.length)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create user');
    data = createdUser[0];

    await session.commitTransaction();
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  if (data) {
    data = User.findOne({ id: data.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }
  return data;
};

const UserService = {
  createStudentInDb,
  createFacultyInDb,
  createAdmin,
};

export default UserService;
