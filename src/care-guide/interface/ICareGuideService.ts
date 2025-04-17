import { CareGuide } from "@prisma/client";
import { CareGuideInput } from "../types/careGuide";

export interface ICareGuideService {
  createCareGuide(data: CareGuideInput): Promise<CareGuide>;
}
