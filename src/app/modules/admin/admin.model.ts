import mongoose, { Schema } from 'mongoose';
import { userNameSchema } from '../../../shared/model.subdocument';
import { bloodGroup, gender } from '../../../shared/shared.constant';
import { AdminModel, IAdmin } from './admin.interface';

const adminSchema = new Schema<IAdmin, AdminModel>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: userNameSchema,
  gender: {
    type: String,
    enum: gender,
    required: true,
  },
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
  bloodGroup: {
    type: String,
    enum: bloodGroup,
    optional: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    optional: true,
  },
  managementDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'ManagementDepartment',
    required: true,
  },
});

const Admin = mongoose.model<IAdmin, AdminModel>('Admin', adminSchema);

export default Admin;
