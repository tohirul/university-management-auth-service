"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const pagination_helper_1 = __importDefault(require("../../../helpers/pagination.helper"));
const user_model_1 = __importDefault(require("../user/user.model"));
const student_constant_1 = require("./student.constant");
const student_model_1 = __importDefault(require("./student.model"));
const student_update_embed_1 = __importDefault(require("./student.update.embed"));
const getStudentFromDb = async (id) => {
    return await student_model_1.default.findById(id)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty');
};
const getAllStudentFromDb = async (filters, options) => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = pagination_helper_1.default.calculatePagination(options);
    const conditions = [];
    if (searchTerm) {
        conditions.push({
            $or: student_constant_1.StudentDataSearchableFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    if (Object.keys(filtersData).length)
        conditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    const sortConditions = {};
    if (sortBy && sortOrder)
        sortConditions[sortBy] = sortOrder;
    const searchConditions = conditions.length > 0 ? { $and: conditions } : {};
    const result = await student_model_1.default.find(searchConditions)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await student_model_1.default.countDocuments(searchConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const updateStudentInDb = async (id, payload) => {
    const exists = await student_model_1.default.findOne({ id });
    if (!exists)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Student not found!');
    const { name, guardian, localGuardian, ...studentData } = payload;
    let updatedStudentData = { ...studentData };
    if (name && Object.keys(name).length)
        updatedStudentData = (0, student_update_embed_1.default)(name, updatedStudentData, 'name');
    if (guardian && Object.keys(guardian).length)
        updatedStudentData = (0, student_update_embed_1.default)(guardian, updatedStudentData, 'guardian');
    if (localGuardian && Object.keys(localGuardian).length)
        updatedStudentData = (0, student_update_embed_1.default)(localGuardian, updatedStudentData, 'localGuardian');
    return await student_model_1.default.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    })
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty');
};
const deleteStudentFromDb = async (id) => {
    const student = await student_model_1.default.findOne({ id });
    if (!student)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Student not found');
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const deletedStudent = await student_model_1.default.findOneAndDelete({ id }, { session });
        if (!deletedStudent)
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Failed to delete student');
        await user_model_1.default.deleteOne({ id }).session(session);
        await session.commitTransaction();
        return deletedStudent;
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {
        // End the session after either commit or rollback
        session.endSession();
    }
};
const StudentService = {
    getStudentFromDb,
    getAllStudentFromDb,
    updateStudentInDb,
    deleteStudentFromDb,
};
exports.default = StudentService;
