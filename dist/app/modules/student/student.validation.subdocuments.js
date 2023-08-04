"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localGuardianSubdocument = exports.guardianSubdocument = exports.studentNameSubdocument = void 0;
const zod_1 = require("zod");
exports.studentNameSubdocument = zod_1.z.object({
    firstName: zod_1.z.string({
        required_error: 'Please enter First Name',
    }),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string({
        required_error: 'Please enter Last Name',
    }),
});
exports.guardianSubdocument = zod_1.z.object({
    fatherName: zod_1.z.string({
        required_error: 'Please enter your fathers Name',
    }),
    fatherOccupation: zod_1.z.string({
        required_error: 'Please enter your fathers current occupation',
    }),
    fatherContactNo: zod_1.z.string({
        required_error: 'Please enter your fathers Contact No',
    }),
    motherName: zod_1.z.string({
        required_error: 'Please enter your mothers Name',
    }),
    motherOccupation: zod_1.z.string({
        required_error: 'Please enter your mothers occupation',
    }),
    motherContactNo: zod_1.z.string({
        required_error: 'Please enter your mothers Contact No',
    }),
    address: zod_1.z.string({
        required_error: 'Please enter your guardians present Address',
    }),
});
exports.localGuardianSubdocument = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Please enter your local guardians name',
    }),
    occupation: zod_1.z.string({
        required_error: 'Please enter your local guardians occupation',
    }),
    contactNo: zod_1.z.string({
        required_error: 'Please enter your local guardian Contact No',
    }),
    address: zod_1.z.string({
        required_error: 'Please enter your local guardians address',
    }),
});
