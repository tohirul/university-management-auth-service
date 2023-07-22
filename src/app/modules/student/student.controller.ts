import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination.constants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { StudentDataFilterableFields } from './student.constant';
import { IStudent, IStudentFilters } from './student.interface';
import StudentService from './student.service';

const getStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await StudentService.getStudentFromDb(id);

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student data was successfully retrieved',
      data: result,
    });
  }
);

const getAllStudents = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(
      req.query,
      StudentDataFilterableFields
    ) as IStudentFilters;
    const paginationOptions = pick(req.query, paginationFields);

    const result = await StudentService.getAllStudentFromDb(
      filters,
      paginationOptions
    );

    sendResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All student data have been successfully retrieved',
      meta: result.meta,
      data: result.data,
    });
  }
);

const updateStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await StudentService.updateStudentInDb(id, updatedData);

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student updated successfully',
      data: result,
    });
  }
);

const deleteStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await StudentService.deleteStudentFromDb(id);
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  }
);

const StudentController = {
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
export default StudentController;
