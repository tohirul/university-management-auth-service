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
const academicDepartment_constant_1 = require('./academicDepartment.constant');
const academicDepartment_service_1 = __importDefault(
  require('./academicDepartment.service')
);
const createAcademicDepartment = (0, catchAsync_1.default)(async (req, res) => {
  const { ...data } = req.body;
  const result =
    await academicDepartment_service_1.default.createAcademicDepartmentInDb(
      data
    );
  (0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Academic Department was created successfully',
    data: result,
  });
});
const getAllAcademicDepartments = (0, catchAsync_1.default)(
  async (req, res) => {
    const filters = (0, pick_1.default)(
      req.query,
      academicDepartment_constant_1.AcademicDepartmentFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_constants_1.paginationFields
    );
    const result =
      await academicDepartment_service_1.default.getAllAcademicDepartmentsFromDb(
        filters,
        paginationOptions
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'All Academic Departments were successfully retrieved',
      meta: result.meta,
      data: result.data,
    });
  }
);
const getSingleAcademicDepartment = (0, catchAsync_1.default)(
  async (req, res) => {
    const id = req.params.id;
    const result =
      await academicDepartment_service_1.default.getSingleDepartmentFromDb(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Academic Departed successfully retrieved',
      data: result,
    });
  }
);
const updateAcademicDepartment = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result =
    await academicDepartment_service_1.default.updateAcademicDepartmentInDb(
      id,
      updateData
    );
  (0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  });
});
const deleteAcademicDepartment = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id;
  const result =
    await academicDepartment_service_1.default.deleteAcademicDepartmentFromDb(
      id
    );
  (0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Academic Department deleted successfully',
    data: result,
  });
});
const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  deleteAcademicDepartment,
  updateAcademicDepartment,
};
exports.default = AcademicDepartmentController;
