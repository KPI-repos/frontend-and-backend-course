import { Category } from "@prisma/client";
import { CategoryInput } from "../types/category";

export interface ICategoryService {
  createCategory(data: CategoryInput): Promise<Category>;
  getCategories(): Promise<Category[]>;
}
