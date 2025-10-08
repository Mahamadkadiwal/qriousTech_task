import { z } from 'zod';

export const SignupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
    gender: z.string().nonempty("Gender is required"),
    birth_date: z.string().nonempty("Birth date is required"),
    mobile: z
      .string()
      .min(10, "Mobile number must be at least 10 digits")
      .max(12, "Mobile number is too long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
