'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const zod_1 = require('zod');
const admin_validation_1 = __importDefault(
  require('../admin/admin.validation')
);
const faculty_validation_1 = __importDefault(
  require('../faculty/faculty.validation')
);
const student_validation_1 = __importDefault(
  require('../student/student.validation')
);
const createStudentZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string().optional(),
    student: student_validation_1.default.createStudentZodObject,
  }),
});
const createFacultyZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string().optional(),
    faculty: faculty_validation_1.default.createFacultyZodObject,
  }),
});
const createAdminZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string().optional(),
    admin: admin_validation_1.default.createAdminZodObject,
  }),
});
const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
exports.default = UserValidation;
