"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const shared_constant_1 = require("../../../shared/shared.constant");
const createAdminZodObject = zod_1.z.object({
    name: zod_1.z.object({
        firstName: zod_1.z.string({
            required_error: 'Please enter First Name',
        }),
        middleName: zod_1.z.string().optional(),
        lastName: zod_1.z.string({
            required_error: 'Please enter Last Name',
        }),
    }),
    gender: zod_1.z.enum([...shared_constant_1.gender], {
        required_error: 'Please enter Gender',
    }),
    dateOfBirth: zod_1.z.string({
        required_error: 'Date of Birth is required',
    }),
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email(),
    contactNo: zod_1.z.string({
        required_error: 'Contact No is required',
    }),
    emergencyContactNo: zod_1.z.string({
        required_error: 'Contact No is required',
    }),
    bloodGroup: zod_1.z.enum([...shared_constant_1.bloodGroup]).optional(),
    presentAddress: zod_1.z.string({
        required_error: 'Present Address is required',
    }),
    permanentAddress: zod_1.z.string({
        required_error: 'Permanent Address is required',
    }),
    profileImage: zod_1.z.string().optional(),
    managementDepartment: zod_1.z.string({
        required_error: 'Management Department is required for Admin',
    }),
});
const updateAdminZodObject = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        gender: zod_1.z.enum([...shared_constant_1.gender]).optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.enum([...shared_constant_1.bloodGroup]).optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        managementDepartment: zod_1.z.string().optional(),
    }),
});
const AdminZodValidation = {
    createAdminZodObject,
    updateAdminZodObject,
};
exports.default = AdminZodValidation;
