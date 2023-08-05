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
const admin_constant_1 = require("./admin.constant");
const admin_service_1 = __importDefault(require("./admin.service"));
const getAllAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, admin_constant_1.AdminDataFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_constants_1.paginationFields);
    const result = await admin_service_1.default.getAllAdmin(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Admins were successfully retrieved',
        meta: result.meta,
        data: result.data,
    });
});
const getAdminById = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await admin_service_1.default.getAdminById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin successfully retrieved',
        data: result,
    });
});
const updateAdminById = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await admin_service_1.default.updateAdminById(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin updated successfully',
        data: result,
    });
});
const deleteAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await admin_service_1.default.deleteAdmin(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin deleted successfully',
        data: result,
    });
});
const AdminController = {
    getAllAdmin,
    getAdminById,
    deleteAdmin,
    updateAdminById,
};
exports.default = AdminController;
