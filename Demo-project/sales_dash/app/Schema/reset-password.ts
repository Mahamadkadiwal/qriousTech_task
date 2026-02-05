import z from "zod";

export const resetPasswordSchema = z.object({
  password: z.string().min(3, { message: 'Password must be at least 3 characters' }),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
