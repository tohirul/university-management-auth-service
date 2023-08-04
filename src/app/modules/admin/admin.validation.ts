import { z } from 'zod';
import { bloodGroup, gender } from '../../../shared/shared.constant';

const createAdminZodObject = z.object({
  name: z.object({
    firstName: z.string({
      required_error: 'Please enter First Name',
    }),
    middleName: z.string().optional(),
    lastName: z.string({
      required_error: 'Please enter Last Name',
    }),
  }),
  gender: z.enum([...gender] as [string, ...string[]], {
    required_error: 'Please enter Gender',
  }),
  dateOfBirth: z.string({
    required_error: 'Date of Birth is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email(),
  contactNo: z.string({
    required_error: 'Contact No is required',
  }),
  emergencyContactNo: z.string({
    required_error: 'Contact No is required',
  }),
  bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
  presentAddress: z.string({
    required_error: 'Present Address is required',
  }),
  permanentAddress: z.string({
    required_error: 'Permanent Address is required',
  }),
  profileImage: z.string().optional(),
  managementDepartment: z.string({
    required_error: 'Management Department is required for Admin',
  }),
});

const updateAdminZodObject = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImage: z.string().optional(),
    managementDepartment: z.string().optional(),
  }),
});

const AdminZodValidation = {
  createAdminZodObject,
  updateAdminZodObject,
};

export default AdminZodValidation;
