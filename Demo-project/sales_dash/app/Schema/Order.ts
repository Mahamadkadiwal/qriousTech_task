import { z } from "zod";

export const StatusEnum = z.enum([
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
]);

export type Status = z.infer<typeof StatusEnum>;

export const orderSchema = z.object({
  id: z.string().optional(),
  customer_name: z.string().min(1, "Customer name is required"),
  product_name: z.string().min(1, "Product is required"),
  totalAmount: z.preprocess((val) => Number(val), z.number().min(1)),
  orderDate: z.string().min(1, "Order date is required"),
  status: StatusEnum,
  isNew: z.boolean().optional(),
});

export type OrderFormData = z.infer<typeof orderSchema>;
