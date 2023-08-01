import { z } from 'zod';

const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Please provide a title',
    }),
  }),
});

const ManagementDepartmentValidation = {
  createManagementDepartmentZodSchema,
};
export default ManagementDepartmentValidation;
