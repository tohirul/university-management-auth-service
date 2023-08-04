'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const zod_1 = require('zod');
const createAcademicFacultyZodValidationSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: 'Title is required to create a faculty',
    }),
  }),
});
const updateAcademicfacultyZodValidationSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: 'Title is required',
    }),
  }),
});
const AcademicFacultyZodValidation = {
  createAcademicFacultyZodValidationSchema,
  updateAcademicfacultyZodValidationSchema,
};
exports.default = AcademicFacultyZodValidation;
