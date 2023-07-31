import { z } from 'zod';
import studentZodValidation from '../student/student.validation';

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: studentZodValidation.createStudentZodObject,
  }),
});

const UserValidation = {
  createStudentZodSchema,
};

export default UserValidation;
