"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.generateFacultyId = exports.generateStudentId = exports.sendUserId = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const findLastUserId = async () => {
    const lastUser = await user_model_1.default.findOne({}, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastUser?.id;
};
const sendUserId = async () => {
    const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');
    return (parseInt(currentId) + 1).toString().padStart(5, '0');
};
exports.sendUserId = sendUserId;
const findLastStrudentId = async () => {
    const lastStudent = await user_model_1.default.findOne({ role: 'student' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};
const generateStudentId = async (academicSemester) => {
    const currentId = (await findLastStrudentId()) || '0'; /* (0).toString().padStart(5, '0'); */
    const increamentId = (parseInt(currentId, 10) + 1)
        .toString()
        .padStart(5, '0');
    return `${academicSemester?.year.substring(2)}${academicSemester?.code}${increamentId}`;
};
exports.generateStudentId = generateStudentId;
const findLastFacultyId = async () => {
    const lastFaculty = await user_model_1.default.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};
const generateFacultyId = async () => {
    const currentId = (await findLastFacultyId()) || '0';
    const incrementId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0');
    return `F-${incrementId}`;
};
exports.generateFacultyId = generateFacultyId;
const findLastAdminId = async () => {
    const lastAdmin = await user_model_1.default.findOne({ role: 'admin' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};
const generateAdminId = async () => {
    const currentId = (await findLastAdminId()) || '0';
    const incrementId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0');
    return `A-${incrementId}`;
};
exports.generateAdminId = generateAdminId;
