import { z } from 'zod';

const createFacultyValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required to create a faculty',
    }),
  }),
});

const AcademicFacultyValidation = {
  createFacultyValidation,
};
export default AcademicFacultyValidation;
