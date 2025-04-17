import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type UserInput = z.infer<typeof UserSchema>;
export type UserWithId = UserInput & { id: string };
