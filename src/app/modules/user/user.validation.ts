import { z } from 'zod';
import AdminZodValidation from '../admin/admin.validation';
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

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: AdminZodValidation.createAdminZodObject,
  }),
});

const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};

export default UserValidation;
