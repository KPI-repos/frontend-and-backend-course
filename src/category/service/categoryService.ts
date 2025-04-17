import { inject, injectable } from "tsyringe";
import { Category, PrismaClient } from "@prisma/client";
import { AppError } from "@/utils/AppError";
import { CategoryInput } from "../types/category";
import { ICategoryService } from "../interface/ICategoryService";

@injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient
  ) {}

  async createCategory(data: CategoryInput): Promise<Category> {
    try {
      return await this.prisma.category.create({ data });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new AppError("Category with this name already exists", 400);
      }
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      return await this.prisma.category.findMany();
    } catch (error: any) {
      throw error;
    }
  }
}
