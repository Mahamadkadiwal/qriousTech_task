import {z} from 'zod';

export const userSchema = z.object({
    id: z.number(),
    name: z.string().min(2),
    email: z.email(),
})

export const usersSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;