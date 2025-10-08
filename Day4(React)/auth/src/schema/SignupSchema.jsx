// src/schemas/signupSchema.js
import { z } from 'zod';

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
  gender: z.string().nonempty("Gender is required"),
  birth_date : z.string().nonempty("Birth date is required"),
  mobile: z.string().nonempty("Mobile number is required"),
});