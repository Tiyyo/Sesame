import * as z from 'zod';
import { ZodType } from 'zod';


export const registerSchema: ZodType = z
  .object({
    email: z.string().email({ message: 'This is not a valid email' }),
    password: z
      .string()
      .min(8, { message: 'Must contains at least 8 characters' })
      .max(64, { message: 'Must contains 64 or less characters' })
      .trim()
      .refine((value) => /\w*[a-z]\w*/.test(value), {
        message: 'Must at least contains one lowercase character',
      })
      .refine((value) => /\w*[A-Z]\w*/.test(value), {
        message: 'Must at least contains one uppercase character',
      })
      .refine((value) => /\d/.test(value), {
        message: 'Must at least contains one number',
      })
      .refine((value) => /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value), {
        message: 'Must at least contains one special character',
      }),
    confirmedPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Password doesn't match",
    path: ['confirm'],
  });