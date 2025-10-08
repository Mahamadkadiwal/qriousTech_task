import {z} from "zod";

export const SigninSchema = z
  .object({
    email: z.string().trim().nonempty("Email is required"),
    password: z.string().trim().min(6, "Password must be at least 6 characters long"),
    
  });
