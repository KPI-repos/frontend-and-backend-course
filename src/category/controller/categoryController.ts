import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ICategoryService } from "../interface/ICategoryService";
import { AppError } from "@/utils/AppError";

@injectable()
class CategoryController {
  constructor(
    @inject("ICategoryService") private categoryService: ICategoryService
  ) {}

  getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const categories = await this.categoryService.getCategories();
      res.status(200).json(categories);
    } catch (error: any) {
      next(error);
    }
  };

  createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const category = await this.categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
