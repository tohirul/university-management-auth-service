"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const createAcademicSemesterZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constant_1.academicSemesterTitles], {
            required_error: 'Title is required',
        }),
        year: zod_1.z.string({
            required_error: 'Year is required',
        }),
        code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCodes]),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: 'Start month is required',
        }),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: 'End month is required',
        }),
    }),
});
const updateAcademicSemesterZodValidationSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...academicSemester_constant_1.academicSemesterTitles], {
            required_error: 'Title is required',
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: 'Year is required',
        })
            .optional(),
        code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCodes]),
        startMonth: zod_1.z
            .enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: 'Start month is required',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: 'End month is required',
        })
            .optional(),
    }),
})
    .refine(data => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: 'Either Both title and code is to be provided or neither',
});
const AcademicSemesterZodValidation = {
    createAcademicSemesterZodValidationSchema,
    updateAcademicSemesterZodValidationSchema,
};
exports.default = AcademicSemesterZodValidation;
