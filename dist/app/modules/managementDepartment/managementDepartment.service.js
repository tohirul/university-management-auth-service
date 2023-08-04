"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const pagination_helper_1 = __importDefault(require("../../../helpers/pagination.helper"));
const managementDepartment_constant_1 = require("./managementDepartment.constant");
const managementDepartment_model_1 = __importDefault(require("./managementDepartment.model"));
const createManagementDepartment = async (data) => {
    return await managementDepartment_model_1.default.create(data);
};
const getAllManagementDepartments = async (filters, options) => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = pagination_helper_1.default.calculatePagination(options);
    const conditions = [];
    if (searchTerm) {
        conditions.push({
            $or: managementDepartment_constant_1.ManagementDepartmentSearchableFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        conditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder)
        sortConditions[sortBy] = sortOrder;
    const searchConditions = conditions.length > 0 ? { $and: conditions } : {};
    const result = await managementDepartment_model_1.default.find(searchConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await managementDepartment_model_1.default.countDocuments(searchConditions);
    return {
        meta: { page, limit, total },
        data: result,
    };
};
const getManagementDepartmentById = async (id) => {
    const exist = await managementDepartment_model_1.default.findById(id);
    if (!exist)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Management Department not found');
    return await managementDepartment_model_1.default.findById(id);
};
const updateManagementDepartment = async (id, payload) => {
    const exist = await managementDepartment_model_1.default.findById(id);
    if (!exist)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Management Department not found');
    return await managementDepartment_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
};
const deleteManagementDepartment = async (id) => {
    const exist = await managementDepartment_model_1.default.findById(id);
    if (!exist)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Management Department not found');
    return await managementDepartment_model_1.default.findByIdAndDelete(id);
};
const ManagementDepartmentService = {
    createManagementDepartment,
    getAllManagementDepartments,
    getManagementDepartmentById,
    updateManagementDepartment,
    deleteManagementDepartment,
};
exports.default = ManagementDepartmentService;
