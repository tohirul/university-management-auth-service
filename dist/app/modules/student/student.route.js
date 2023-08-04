"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_controller_1 = __importDefault(require("./student.controller"));
const student_validation_1 = __importDefault(require("./student.validation"));
const route = express_1.default.Router();
route.get('/:id', student_controller_1.default.getStudent);
route.get('/', student_controller_1.default.getAllStudents);
route.delete('/:id', student_controller_1.default.deleteStudent);
route.patch('/:id', (0, validateRequest_1.default)(student_validation_1.default.updateStudentZodSchema), student_controller_1.default.updateStudent);
const StudentRoutes = route;
exports.default = StudentRoutes;
