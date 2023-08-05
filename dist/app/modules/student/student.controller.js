'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const http_status_1 = __importDefault(require('http-status'));
const pagination_constants_1 = require('../../../constants/pagination.constants');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const student_constant_1 = require('./student.constant');
const student_service_1 = __importDefault(require('./student.service'));
const getStudent = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id;
  const result = await student_service_1.default.getStudentFromDb(id);
  (0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Student data was successfully retrieved',
    data: result,
  });
});
const getAllStudents = (0, catchAsync_1.default)(async (req, res) => {
  const filters = (0, pick_1.default)(
    req.query,
    student_constant_1.StudentDataFilterableFields
  );
  const paginationOptions = (0, pick_1.default)(
    req.query,
    pagination_constants_1.paginationFields
  );
  const result = await student_service_1.default.getAllStudentFromDb(
    filters,
    paginationOptions
  );
  (0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'All student data have been successfully retrieved',
    meta: result.meta,
    data: result.data,
  });
});
const updateStudent = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await student_service_1.default.updateStudentInDb(
    id,
    updatedData
  );
  (0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});
const deleteStudent = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id;
  const result = await student_service_1.default.deleteStudentFromDb(id);
  (0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});
const StudentController = {
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
exports.default = StudentController;
