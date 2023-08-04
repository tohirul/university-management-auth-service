"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const academicSemester_model_1 = __importDefault(require("../academicSemester/academicSemester.model"));
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const faculty_model_1 = __importDefault(require("../faculty/faculty.model"));
const student_model_1 = __importDefault(require("../student/student.model"));
const user_model_1 = __importDefault(require("./user.model"));
const user_utility_1 = require("./user.utility");
const createStudentInDb = async (student, userData) => {
    if (!userData.password) {
        userData.password = config_1.default.default_student_pass;
    }
    userData.role = 'student';
    const academicSemester = await academicSemester_model_1.default.findById(student.academicSemester);
    let data = null;
    const session = await (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const id = await (0, user_utility_1.generateStudentId)(academicSemester);
        userData.id = id;
        student.id = id;
        const createdStudent = await student_model_1.default.create([student], { session });
        if (!createdStudent.length)
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student');
        userData.student = createdStudent[0]._id;
        const createdUser = await user_model_1.default.create([userData], { session });
        if (!createdUser.length)
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create User');
        data = createdUser[0];
        await session.commitTransaction();
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {
        await session.endSession();
    }
    if (data) {
        data = await user_model_1.default.findOne({ id: data.id }).populate({
            path: 'student',
            populate: [
                {
                    path: 'academicSemester',
                },
                {
                    path: 'academicDepartment',
                },
                {
                    path: 'academicFaculty',
                },
            ],
        });
    }
    return data;
};
const createFacultyInDb = async (faculty, userData) => {
    if (!userData.password) {
        userData.password = config_1.default.default_faculty_pass;
    }
    userData.role = 'faculty';
    let data = null;
    const session = await (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const id = await (0, user_utility_1.generateFacultyId)();
        userData.id = id;
        faculty.id = id;
        const createdFaculty = await faculty_model_1.default.create([faculty], { session });
        if (!createdFaculty.length)
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create faculty');
        userData.faculty = createdFaculty[0]._id;
        const createdUser = await user_model_1.default.create([userData], { session });
        if (!createdUser.length)
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create user');
        data = createdUser[0];
        await session.commitTransaction();
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {
        await session.endSession();
    }
    if (data) {
        data = user_model_1.default.findOne({ id: data.id }).populate({
            path: 'faculty',
            populate: [
                {
                    path: 'academicDepartment',
                },
                {
                    path: 'academicFaculty',
                },
            ],
        });
    }
    return data;
};
const createAdmin = async (admin, userData) => {
    if (!userData.password)
        userData.password = config_1.default.default_admin_pass;
    userData.role = 'admin';
    let data = null;
    const session = await (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const id = await (0, user_utility_1.generateAdminId)();
        userData.id = id;
        admin.id = id;
        const createdAdmin = await admin_model_1.default.create([admin], { session });
        if (!createdAdmin.length)
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create admin');
        userData.admin = createdAdmin[0]._id;
        const createdUser = await user_model_1.default.create([userData], { session });
        if (!createdUser.length)
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create user');
        data = createdUser[0];
        await session.commitTransaction();
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
    if (data) {
        data = user_model_1.default.findOne({ id: data.id }).populate({
            path: 'admin',
            populate: [
                {
                    path: 'managementDepartment',
                },
            ],
        });
    }
    return data;
};
const UserService = {
    createStudentInDb,
    createFacultyInDb,
    createAdmin,
};
exports.default = UserService;
