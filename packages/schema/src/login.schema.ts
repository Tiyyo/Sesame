import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;