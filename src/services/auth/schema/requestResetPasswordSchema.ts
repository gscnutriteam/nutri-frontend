import { z } from 'zod';

export const requestResetPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

export type RequestResetPasswordFormData = z.infer<typeof requestResetPasswordSchema>; 