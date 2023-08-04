"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createDepartmaentZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required to create departmaent',
        }),
        academicFaculty: zod_1.z.string({
            required_error: 'AcademicFaculty is required to create departmaent',
        }),
    }),
});
const updateAcademicDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        academicFaculty: zod_1.z.string().optional(),
    }),
});
const AcademicDepartmentZodvalidation = {
    createDepartmaentZodValidationSchema,
    updateAcademicDepartmentZodSchema,
};
exports.default = AcademicDepartmentZodvalidation;
