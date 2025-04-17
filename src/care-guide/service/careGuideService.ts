import { PrismaClient, CareGuide } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { ICareGuideService } from "../interface/ICareGuideService";
import { AppError } from "@/utils/AppError";
import { CareGuideInput } from "../types/careGuide";

@injectable()
export class CareGuideService implements ICareGuideService {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient
  ) {}

  async createCareGuide(data: CareGuideInput): Promise<CareGuide> {
    try {
      return this.prisma.careGuide.create({ data });
    } catch (error: any) {
      throw error;
    }
  }
}
