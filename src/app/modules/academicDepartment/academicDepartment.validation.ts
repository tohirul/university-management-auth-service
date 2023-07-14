import { z } from 'zod';

const createDepartmaentZodValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required to create departmaent',
    }),
    academicFaculty: z.string({
      required_error: 'AcademicFaculty is required to create departmaent',
    }),
  }),
});

const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

const AcademicDepartmentZodvalidation = {
  createDepartmaentZodValidationSchema,
  updateAcademicDepartmentZodSchema,
};
export default AcademicDepartmentZodvalidation;
