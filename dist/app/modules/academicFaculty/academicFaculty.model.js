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
const academicFacultySchema = new mongoose_1.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
academicFacultySchema.pre('save', async function (next) {
  const exists = await AcademicFaculty.findOne({
    title: this.title,
  });
  if (exists) {
    throw new ApiError_1.default(
      http_status_1.default.CONFLICT,
      'Faculty already exists in the database, no need to create a new one'
    );
  }
  next();
});
const AcademicFaculty = (0, mongoose_1.model)(
  'AcademicFaculty',
  academicFacultySchema
);
exports.default = AcademicFaculty;
