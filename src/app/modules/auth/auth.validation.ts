import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required to login',
    }),
    password: z.string({
      required_error: 'Password is required to login',
    }),
  }),
});

const AuthValidation = {
  loginZodSchema,
};

export default AuthValidation;
