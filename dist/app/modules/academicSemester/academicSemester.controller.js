"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const pagination_constants_1 = require("../../../constants/pagination.constants");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_service_1 = __importDefault(require("./academicSemester.service"));
const createSemester = (0, catchAsync_1.default)(async (req, res) => {
    const { ...data } = req.body;
    const result = await academicSemester_service_1.default.createSemesterInDb(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Semester successfully created',
        data: result,
    });
});
const getAllSemesters = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, academicSemester_constant_1.AcademicSemesterFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_constants_1.paginationFields);
    const result = await academicSemester_service_1.default.getAllSemestersFromDb(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All semesters have been successfully retrieved.',
        meta: result.meta,
        data: result.data,
    });
});
const getSingleSemester = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await academicSemester_service_1.default.getSingleSemesterFromDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester successfully retrieved.',
        data: result,
    });
});
const updateSemester = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await academicSemester_service_1.default.updateSemesterFromDb(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester updated successfully',
        data: result,
    });
});
const deleteSemester = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await academicSemester_service_1.default.deleteSemesterFromDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester deleted successfully',
        data: result,
    });
});
const AcademicSemesterController = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    updateSemester,
    deleteSemester,
};
exports.default = AcademicSemesterController;
