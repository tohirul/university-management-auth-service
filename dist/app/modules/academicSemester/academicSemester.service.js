"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const pagination_helper_1 = __importDefault(require("../../../helpers/pagination.helper"));
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_model_1 = __importDefault(require("./academicSemester.model"));
const createSemesterInDb = async (payload) => {
    if (academicSemester_constant_1.academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Inappropriate semester code');
    }
    return await academicSemester_model_1.default.create(payload);
};
const getAllSemestersFromDb = async (filters, options) => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = pagination_helper_1.default.calculatePagination(options);
    const conditions = [];
    if (searchTerm) {
        conditions.push({
            $or: academicSemester_constant_1.AcademicSemesterSearchableFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        conditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const searchConditions = conditions.length > 0 ? { $and: conditions } : {};
    const result = await academicSemester_model_1.default.find(searchConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await academicSemester_model_1.default.countDocuments(searchConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getSingleSemesterFromDb = async (id) => {
    return await academicSemester_model_1.default.findById(id);
};
const updateSemesterFromDb = async (id, payload) => {
    if (payload.title &&
        payload.code &&
        academicSemester_constant_1.academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid semester input, code and title must match');
    }
    return await academicSemester_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
};
const deleteSemesterFromDb = async (id) => {
    return await academicSemester_model_1.default.findByIdAndDelete(id);
};
const AcademicSemesterService = {
    createSemesterInDb,
    getAllSemestersFromDb,
    getSingleSemesterFromDb,
    updateSemesterFromDb,
    deleteSemesterFromDb,
};
exports.default = AcademicSemesterService;
