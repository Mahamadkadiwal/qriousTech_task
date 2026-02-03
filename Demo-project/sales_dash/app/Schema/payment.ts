import { z } from "zod";

export const paymentSchema = z.object({
  cardHolder: z.string().min(3, "Card holder name is required"),
  cardNumber: z
    .string()
    .length(16, "Card number must be 16 digits")
    .regex(/^\d+$/, "Only numbers allowed"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry format (MM/YY)"),
  cvv: z
    .string()
    .length(3, "CVV must be 3 digits")
    .regex(/^\d+$/, "Only numbers allowed"),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
