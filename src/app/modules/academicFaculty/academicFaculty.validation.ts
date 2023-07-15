import { z } from 'zod';

const createAcademicFacultyZodValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required to create a faculty',
    }),
  }),
});

const updateAcademicfacultyZodValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const AcademicFacultyZodValidation = {
  createAcademicFacultyZodValidationSchema,
  updateAcademicfacultyZodValidationSchema,
};
export default AcademicFacultyZodValidation;
