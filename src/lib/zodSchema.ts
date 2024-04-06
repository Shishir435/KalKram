import * as z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Please enter a valid email',
    })
    .max(56, {
      message: 'Email must be less than 56 characters',
    }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(56, {
      message: 'Password must be less than 56 characters',
    }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Username must be at least 3 characters long',
    })
    .max(56, {
      message: 'Username must be less than 56 characters',
    }),
  email: z
    .string()
    .email({
      message: 'Please enter a valid email',
    })
    .max(56, {
      message: 'Email must be less than 56 characters',
    }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(56, {
      message: 'Password must be less than 56 characters',
    }),
  policy: z.boolean().default(false),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;
