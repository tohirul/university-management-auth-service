"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const shared_constant_1 = require("../../../shared/shared.constant");
const student_validation_subdocuments_1 = require("./student.validation.subdocuments");
const createStudentZodObject = zod_1.z.object({
    name: student_validation_subdocuments_1.studentNameSubdocument,
    gender: zod_1.z.enum([...shared_constant_1.gender], {
        required_error: 'Gender is required',
    }),
    dateOfBirth: zod_1.z.string({
        required_error: 'Date of Birth is required',
    }),
    email: zod_1.z.string({ required_error: 'Email is required' }).email(),
    contactNo: zod_1.z.string({ required_error: 'Contact No is required' }),
    emergencyContactNo: zod_1.z.string({ required_error: 'Contact No is required' }),
    bloodGroup: zod_1.z.enum([...shared_constant_1.bloodGroup]).optional(),
    presentAddress: zod_1.z.string({ required_error: 'Present Address is required' }),
    permanentAddress: zod_1.z.string({
        required_error: 'Permanent Address is required',
    }),
    guardian: student_validation_subdocuments_1.guardianSubdocument,
    localGuardian: student_validation_subdocuments_1.localGuardianSubdocument,
    academicFaculty: zod_1.z.string({
        required_error: 'Academic Faculty is required',
    }),
    academicDepartment: zod_1.z.string({
        required_error: 'Academic department is required',
    }),
    academicSemester: zod_1.z.string({
        required_error: 'Academic semester is required',
    }),
    profileImage: zod_1.z.string().optional(),
});
const updateStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
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
        academicSemester: zod_1.z.string().optional(),
        academicDepartment: zod_1.z.string().optional(),
        academicFaculty: zod_1.z.string().optional(),
        guardian: zod_1.z
            .object({
            fatherName: zod_1.z.string().optional(),
            fatherOccupation: zod_1.z.string().optional(),
            fatherContactNo: zod_1.z.string().optional(),
            motherName: zod_1.z.string().optional(),
            motherOccupation: zod_1.z.string().optional(),
            motherContactNo: zod_1.z.string().optional(),
            address: zod_1.z.string().optional(),
        })
            .optional(),
        localGuardian: zod_1.z
            .object({
            name: zod_1.z.string().optional(),
            occupation: zod_1.z.string().optional(),
            contactNo: zod_1.z.string().optional(),
            address: zod_1.z.string().optional(),
        })
            .optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
const StudentZodValidation = {
    createStudentZodObject,
    updateStudentZodSchema,
};
exports.default = StudentZodValidation;
