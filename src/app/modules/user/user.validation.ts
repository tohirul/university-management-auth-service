import { z } from 'zod';
import FacultyZodValidation from '../faculty/faculty.validation';
import studentZodValidation from '../student/student.validation';

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: studentZodValidation.createStudentZodObject,
  }),
});

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: FacultyZodValidation.createFacultyZodObject,
  }),
});

const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
};

export default UserValidation;
