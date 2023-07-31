import mongoose, { Schema } from 'mongoose';
import { userNameSchema } from '../../../shared/model.subdocument';
import { bloodGroup, gender } from '../../../shared/shared.constant';
import { FacultyModel, IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty, FacultyModel>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: userNameSchema,
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
    enum: gender,
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
  bloodGroup: { type: String, enum: bloodGroup, required: true },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
  designation: { type: String, required: true },
  profileImage: { type: String, required: false },
});

const Faculty = mongoose.model<IFaculty, FacultyModel>(
  'Faculty',
  facultySchema
);

export default Faculty;
