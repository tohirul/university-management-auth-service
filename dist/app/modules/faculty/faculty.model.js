'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importStar(require('mongoose'));
const model_subdocument_1 = require('../../../shared/model.subdocument');
const shared_constant_1 = require('../../../shared/shared.constant');
const facultySchema = new mongoose_1.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: model_subdocument_1.userNameSchema,
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: shared_constant_1.gender,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: false,
  },
  presentAddress: {
    type: String,
    required: false,
  },
  bloodGroup: {
    type: String,
    enum: shared_constant_1.bloodGroup,
    required: true,
  },
  academicDepartment: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  academicFaculty: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
  designation: { type: String, required: true },
  profileImage: { type: String, required: false },
});
const Faculty = mongoose_1.default.model('Faculty', facultySchema);
exports.default = Faculty;
