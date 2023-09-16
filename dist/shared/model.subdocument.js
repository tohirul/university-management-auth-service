"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localGuardianSchema = exports.guardianSchema = exports.userNameSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: true,
    },
});
exports.guardianSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
    address: { type: String, required: true },
});
exports.localGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
});
