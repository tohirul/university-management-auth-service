import { z } from 'zod';

const createFacultyZodValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required to create a faculty',
    }),
  }),
});

const updatefacultyZodValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const AcademicFacultyValidation = {
  createFacultyZodValidationSchema,
  updatefacultyZodValidationSchema,
};
export default AcademicFacultyValidation;
