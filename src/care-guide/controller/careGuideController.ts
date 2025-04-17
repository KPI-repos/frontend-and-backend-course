import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ICareGuideService } from "../interface/ICareGuideService";

@injectable()
export class CareGuideController {
  constructor(
    @inject("ICareGuideService") private careGuideService: ICareGuideService
  ) {}

  createCareGuide = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const careGuide = await this.careGuideService.createCareGuide(req.body);
      res.status(201).json(careGuide);
    } catch (error) {
      next(error);
    }
  };
}
