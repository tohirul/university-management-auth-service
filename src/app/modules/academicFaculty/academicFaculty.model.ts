import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';

import ApiError from '../../../errors/ApiError';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
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
    throw new ApiError(
      httpStatus.CONFLICT,
      'Faculty already exists in the database, no need to create a new one'
    );
  }
  next();
});

const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);

export default AcademicFaculty;
