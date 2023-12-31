import { Schema, model } from 'mongoose';
import {
  guardianSchema,
  localGuardianSchema,
  userNameSchema,
} from '../../../shared/model.subdocument';

import { bloodGroup, gender } from '../../../shared/shared.constant';
import { IStudent, StudentModel } from './student.interface';

export const studentSchema = new Schema<IStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: userNameSchema,
    gender: { type: String, enum: gender, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: { type: String, required: true, enum: bloodGroup },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
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

const Student = model<IStudent, StudentModel>('Student', studentSchema);

export default Student;
