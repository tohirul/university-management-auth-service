"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const shared_constant_1 = require("../../../shared/shared.constant");
const createFacultyZodObject = zod_1.z.object({
    name: zod_1.z.object({
        firstName: zod_1.z.string({
            required_error: 'Please enter first name',
        }),
        middleName: zod_1.z.string().optional(),
        lastName: zod_1.z.string({
            required_error: 'Please enter last name',
        }),
    }),
    dateOfBirth: zod_1.z.string({
        required_error: 'Please enter date of birth',
    }),
    email: zod_1.z.string({ required_error: 'Please enter email' }).email(),
    contactNo: zod_1.z.string({ required_error: 'Please enter your contact number' }),
    emergencyContactNo: zod_1.z.string({
        required_error: 'Please enter emergency contact number',
    }),
    gender: zod_1.z.enum([...shared_constant_1.gender], {
        required_error: 'Please enter your gender',
    }),
    permanentAddress: zod_1.z.string({
        required_error: 'Please enter permanent address',
    }),
    presentAddress: zod_1.z.string({
        required_error: 'Present address is required',
    }),
    bloodGroup: zod_1.z.enum([...shared_constant_1.bloodGroup]).optional(),
    academicDepartment: zod_1.z.string({
        required_error: 'Academic department is required',
    }),
    academicFaculty: zod_1.z.string({ required_error: 'Academic faculty is required' }),
    designation: zod_1.z.string({ required_error: 'Designation is required' }),
    profileImage: zod_1.z.string().optional(),
});
const updateFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        gender: zod_1.z.enum([...shared_constant_1.gender]).optional(),
        permanentAddress: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.enum([...shared_constant_1.bloodGroup]).optional(),
        academicDepartment: zod_1.z.string().optional(),
        academicFaculty: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
const FacultyZodValidation = {
    createFacultyZodObject,
    updateFacultyZodSchema,
};
exports.default = FacultyZodValidation;
