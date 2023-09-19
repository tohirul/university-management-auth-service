'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.studentSchema = void 0;
const mongoose_1 = require('mongoose');
const model_subdocument_1 = require('../../../shared/model.subdocument');
const shared_constant_1 = require('../../../shared/shared.constant');
exports.studentSchema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: model_subdocument_1.userNameSchema,
    gender: { type: String, enum: shared_constant_1.gender, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      required: true,
      enum: shared_constant_1.bloodGroup,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: model_subdocument_1.guardianSchema,
    localGuardian: model_subdocument_1.localGuardianSchema,
    academicFaculty: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    academicSemester: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    profileImage: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
const Student = (0, mongoose_1.model)('Student', exports.studentSchema);
exports.default = Student;
