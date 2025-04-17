import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { inject, injectable } from "tsyringe";
import { IPlantService } from "../interface/IPlantService";

@injectable()
class PlantController {
  constructor(@inject("IPlantService") private plantService: IPlantService) {}

  createPlant = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const plant = await this.plantService.createPlant(req.body);
      res.status(201).json(plant);
    } catch (error) {
      next(error);
    }
  };

  getPlants = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const plants = await this.plantService.getPlants();
      res.status(200).json(plants);
    } catch (error) {
      next(error);
    }
  };
}

export default PlantController;
