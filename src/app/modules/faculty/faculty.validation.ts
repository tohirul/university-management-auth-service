import { z } from 'zod';
import { bloodGroup, gender } from '../../../shared/shared.constant';

const createFacultyZodObject = z.object({
  name: z.object({
    firstName: z.string({
      required_error: 'Please enter first name',
    }),
    middleName: z.string().optional(),
    lastName: z.string({
      required_error: 'Please enter last name',
    }),
  }),
  dateOfBirth: z.string({
    required_error: 'Please enter date of birth',
  }),
  email: z.string({ required_error: 'Please enter email' }).email(),
  contactNo: z.string({ required_error: 'Please enter your contact number' }),
  emergencyContactNo: z.string({
    required_error: 'Please enter emergency contact number',
  }),
  gender: z.enum([...gender] as [string, ...string[]], {
    required_error: 'Please enter your gender',
  }),
  permanentAddress: z.string({
    required_error: 'Please enter permanent address',
  }),
  presentAddress: z.string({
    required_error: 'Present address is required',
  }),
  bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
  academicDepartment: z.string({
    required_error: 'Academic department is required',
  }),
  academicFaculty: z.string({ required_error: 'Academic faculty is required' }),
  designation: z.string({ required_error: 'Designation is required' }),
  profileImage: z.string().optional(),
});

const updateFacultyZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    permanentAddress: z.string().optional(),
    presentAddress: z.string().optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
    designation: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

const FacultyZodValidation = {
  createFacultyZodObject,
  updateFacultyZodSchema,
};
export default FacultyZodValidation;
