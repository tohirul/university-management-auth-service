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
const faculty_constant_1 = require("./faculty.constant");
const faculty_service_1 = __importDefault(require("./faculty.service"));
const getFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await faculty_service_1.default.getFacultyFromDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty was successfully retrieved',
        data: result,
    });
});
const getAllFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, faculty_constant_1.FacultyFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_constants_1.paginationFields);
    const result = await faculty_service_1.default.getAllFacultyFromDb(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Faculties have been successfully retrieved',
        meta: result.meta,
        data: result.data,
    });
});
const updateFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await faculty_service_1.default.updateFacultyInDb(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty updated successfully',
        data: result,
    });
});
const deleteFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await faculty_service_1.default.deleteFacultyFromDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty deleted successfully',
        data: result,
    });
});
const FacultyController = {
    getFaculty,
    getAllFaculty,
    updateFaculty,
    deleteFaculty,
};
exports.default = FacultyController;
