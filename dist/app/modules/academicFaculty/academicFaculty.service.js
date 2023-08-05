"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_helper_1 = __importDefault(require("../../../helpers/pagination.helper"));
const academicFaculty_constant_1 = require("./academicFaculty.constant");
const academicFaculty_model_1 = __importDefault(require("./academicFaculty.model"));
const createFacultyInDb = async (data) => {
    return await academicFaculty_model_1.default.create(data);
};
const getFacultyFromDb = async (id) => {
    return academicFaculty_model_1.default.findById(id);
};
const getAllAcademicFacultiesFromDb = async (filters, options) => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = pagination_helper_1.default.calculatePagination(options);
    const conditions = [];
    if (searchTerm) {
        conditions.push({
            $or: academicFaculty_constant_1.academicFacultySearchableFields.map(field => ({
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
    const result = await academicFaculty_model_1.default.find(searchConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await academicFaculty_model_1.default.countDocuments(searchConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const deleteFacultyFromDb = async (id) => {
    return academicFaculty_model_1.default.findByIdAndDelete(id);
};
const updateFacultyInDb = async (id, payload) => {
    return await academicFaculty_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
};
const AcademicFacultyService = {
    createFacultyInDb,
    getFacultyFromDb,
    getAllAcademicFacultiesFromDb,
    deleteFacultyFromDb,
    updateFacultyInDb,
};
exports.default = AcademicFacultyService;
