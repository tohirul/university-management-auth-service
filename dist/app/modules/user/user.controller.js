"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = __importDefault(require("./user.service"));
const createStudent = (0, catchAsync_1.default)(async (req, res) => {
    const { student, ...userData } = req.body;
    const result = await user_service_1.default.createStudentInDb(student, userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User successfully created',
        data: result,
    });
});
const createFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const { faculty, ...userData } = req.body;
    const result = await user_service_1.default.createFacultyInDb(faculty, userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty created successfully',
        data: result,
    });
});
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { admin, ...userData } = req.body;
    const result = await user_service_1.default.createAdmin(admin, userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin created successfully',
        data: result,
    });
});
const UserController = {
    createStudent,
    createFaculty,
    createAdmin,
};
exports.default = UserController;
