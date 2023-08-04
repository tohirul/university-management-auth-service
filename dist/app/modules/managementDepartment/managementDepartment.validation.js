"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createManagementDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Please provide a title',
        }),
    }),
});
const updateManagementDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Please provide a title',
        }),
    }),
});
const ManagementDepartmentValidation = {
    createManagementDepartmentZodSchema,
    updateManagementDepartmentZodSchema,
};
exports.default = ManagementDepartmentValidation;
