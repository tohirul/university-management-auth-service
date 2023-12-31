'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const http_status_1 = __importDefault(require('http-status'));
const mongoose_1 = require('mongoose');
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const academicSemester_constant_1 = require('./academicSemester.constant');
const academicSemesterSchema = new mongoose_1.Schema(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemester_constant_1.academicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemester_constant_1.academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemester_constant_1.academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemester_constant_1.academicSemesterMonths,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
academicSemesterSchema.pre('save', async function (next) {
  const exists = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (exists) {
    throw new ApiError_1.default(
      http_status_1.default.CONFLICT,
      'Semester already exists and cannot be submitted again'
    );
  }
  next();
});
const AcademicSemester = (0, mongoose_1.model)(
  'AcademicSemester',
  academicSemesterSchema
);
exports.default = AcademicSemester;
