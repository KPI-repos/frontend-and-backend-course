import { PlantInput } from "@/plant/types/plant";
import { Plant } from "@prisma/client";

export interface IPlantService {
  createPlant(data: PlantInput): Promise<Plant>;
  getPlants(): Promise<Plant[] | []>;
}
