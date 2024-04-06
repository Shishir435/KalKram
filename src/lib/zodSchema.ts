import * as z from 'zod';

export const PasswordSchema = z
  .string()
  .min(8, {
    message: 'Password must be at least 8 characters long',
  })
  .max(56, {
    message: 'Password must be less than 56 characters',
  });
export type PasswordSchemaType = z.infer<typeof PasswordSchema>;

export const EmailSchema = z
  .string()
  .email({
    message: 'Please enter a valid email',
  })
  .max(56, {
    message: 'Email must be less than 56 characters',
  });

export type EmailSchemaTyper = z.infer<typeof EmailSchema>;

export const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
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
  email: EmailSchema,
  password: PasswordSchema,
  policy: z.boolean().default(false),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;

export const ForgetPassowrdSchema = z.object({
  email: z.string().email({message: 'Please enter a valid email'}).max(56, {
    message: 'Email must be less than 56 characters',
  }),
});

export type ForgetPassowrdSchemaType = z.infer<typeof ForgetPassowrdSchema>;

export const OtpSchema = z.object({
  otp: z
    .string()
    .min(4, {
      message: 'Otp must be 4 exactly characters long',
    })
    .max(4, {
      message: 'Otp must be 4 exactly characters long',
    }),
});

export type OtpType = z.infer<typeof OtpSchema>;

export const ResetPasswordSchema = z.object({
  newPassword: PasswordSchema,
  confirmPassword: PasswordSchema,
});

export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
