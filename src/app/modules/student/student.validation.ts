import { z } from 'zod';
import { bloodGroup, gender } from '../../../shared/shared.constant';
import {
  guardianSubdocument,
  localGuardianSubdocument,
  studentNameSubdocument,
} from './student.validation.subdocuments';

const createStudentZodObject = z.object({
  name: studentNameSubdocument,
  gender: z.enum([...gender] as [string, ...string[]], {
    required_error: 'Gender is required',
  }),
  dateOfBirth: z.string({
    required_error: 'Date of Birth is required',
  }),
  email: z.string({ required_error: 'Email is required' }).email(),
  contactNo: z.string({ required_error: 'Contact No is required' }),
  emergencyContactNo: z.string({ required_error: 'Contact No is required' }),
  bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
  presentAddress: z.string({ required_error: 'Present Address is required' }),
  permanentAddress: z.string({
    required_error: 'Permanent Address is required',
  }),
  guardian: guardianSubdocument,
  localGuardian: localGuardianSubdocument,
  academicFaculty: z.string({
    required_error: 'Academic Faculty is required',
  }),
  academicDepartment: z.string({
    required_error: 'Academic department is required',
  }),
  academicSemester: z.string({
    required_error: 'Academic semester is required',
  }),
  profileImage: z.string().optional(),
});

const updateStudentZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
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
    academicSemester: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
    guardian: z
      .object({
        fatherName: z.string().optional(),
        fatherOccupation: z.string().optional(),
        fatherContactNo: z.string().optional(),
        motherName: z.string().optional(),
        motherOccupation: z.string().optional(),
        motherContactNo: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    localGuardian: z
      .object({
        name: z.string().optional(),
        occupation: z.string().optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    profileImage: z.string().optional(),
  }),
});

const StudentZodValidation = {
  createStudentZodObject,
  updateStudentZodSchema,
};
export default StudentZodValidation;
