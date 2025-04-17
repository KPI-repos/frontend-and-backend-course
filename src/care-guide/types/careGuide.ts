import { z } from "zod";

export const CareGuideSchema = z.object({
  plantId: z.number().int().positive(),
  watering: z.string().min(1),
  sunlight: z.string().min(1),
  temperature: z.string().min(1),
});

export type CareGuideInput = z.infer<typeof CareGuideSchema>;
