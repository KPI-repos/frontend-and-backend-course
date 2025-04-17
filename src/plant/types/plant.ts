import { z } from "zod";

export const PlantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  categoryId: z
    .number()
    .int()
    .positive("Category ID must be a positive integer"),
});

export type PlantInput = z.infer<typeof PlantSchema>;
