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

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token not found',
    }),
  }),
});

const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
};

export default AuthValidation;
