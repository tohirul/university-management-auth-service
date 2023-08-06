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
const academicFaculty_constant_1 = require("./academicFaculty.constant");
const academicFaculty_service_1 = __importDefault(require("./academicFaculty.service"));
const createFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const { ...createFacultyData } = req.body;
    const result = await academicFaculty_service_1.default.createFacultyInDb(createFacultyData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty Created successfully',
        data: result,
    });
});
const getFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await academicFaculty_service_1.default.getFacultyFromDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty successfully retrieved',
        data: result,
    });
});
const getAllAcademicFaculties = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, academicFaculty_constant_1.academicFacultyFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_constants_1.paginationFields);
    const result = await academicFaculty_service_1.default.getAllAcademicFacultiesFromDb(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Academic Faculties retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});
const deleteFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await academicFaculty_service_1.default.deleteFacultyFromDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester deleted successfully',
        data: result,
    });
});
const updateFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await academicFaculty_service_1.default.updateFacultyInDb(id, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty details updated successfully',
        data: result,
    });
});
const AcademicFacultyController = {
    createFaculty,
    getFaculty,
    getAllAcademicFaculties,
    deleteFaculty,
    updateFaculty,
};
exports.default = AcademicFacultyController;
