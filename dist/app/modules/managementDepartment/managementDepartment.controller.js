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
const managementDepartment_constant_1 = require('./managementDepartment.constant');
const managementDepartment_service_1 = __importDefault(
  require('./managementDepartment.service')
);
const createManagementDepartment = (0, catchAsync_1.default)(
  async (req, res) => {
    const { ...data } = req.body;
    const result =
      await managementDepartment_service_1.default.createManagementDepartment(
        data
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Successfully created management department',
      data: result,
    });
  }
);
const getAllManagementDepartments = (0, catchAsync_1.default)(
  async (req, res) => {
    const filters = (0, pick_1.default)(
      req.query,
      managementDepartment_constant_1.ManagementDepartmentFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_constants_1.paginationFields
    );
    const result =
      await managementDepartment_service_1.default.getAllManagementDepartments(
        filters,
        paginationOptions
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'All Management Department successfully retrieved',
      meta: result.meta,
      data: result.data,
    });
  }
);
const getManagementDepartmentById = (0, catchAsync_1.default)(
  async (req, res) => {
    const id = req.params.id;
    const result =
      await managementDepartment_service_1.default.getManagementDepartmentById(
        id
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Management Department successfully retrieved',
      data: result,
    });
  }
);
const updateManagementDepartment = (0, catchAsync_1.default)(
  async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result =
      await managementDepartment_service_1.default.updateManagementDepartment(
        id,
        updatedData
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Management Department updated successfully',
      data: result,
    });
  }
);
const deleteManagementDepartment = (0, catchAsync_1.default)(
  async (req, res) => {
    const id = req.params.id;
    const result =
      await managementDepartment_service_1.default.deleteManagementDepartment(
        id
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Management Department deleted successfully',
      data: result,
    });
  }
);
const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getManagementDepartmentById,
  updateManagementDepartment,
  deleteManagementDepartment,
};
exports.default = ManagementDepartmentController;
