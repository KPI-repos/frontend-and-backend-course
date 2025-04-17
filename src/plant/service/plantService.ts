import { AppError } from "@/utils/AppError";
import { Plant, PrismaClient } from "@prisma/client";
import { injectable, inject } from "tsyringe";
import { IPlantService } from "../interface/IPlantService";
import { PlantInput } from "@/plant/types/plant";

@injectable()
export class PlantService implements IPlantService {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient
  ) {}

  async createPlant(data: PlantInput): Promise<Plant> {
    try {
      return await this.prisma.plant.create({ data });
    } catch (error: any) {
      throw error;
    }
  }

  async getPlants(): Promise<Plant[] | []> {
    try {
      return await this.prisma.plant.findMany();
    } catch (error: any) {
      throw new AppError("Failed to fetch plants", 500);
    }
  }
}
