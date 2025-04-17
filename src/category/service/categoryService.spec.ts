import "reflect-metadata";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient, Category } from "@prisma/client";
import { CategoryService } from "./categoryService";

describe("CategoryService", () => {
  let prismaMock: DeepMockProxy<PrismaClient>;
  let categoryService: CategoryService;

  beforeEach(() => {
    prismaMock = mockDeep<PrismaClient>();
    categoryService = new CategoryService(prismaMock);
  });

  describe("getCategories", () => {
    it("should return an array of categories", async () => {
      const mockCategories: Category[] = [
        { id: 1, name: "Indoor Plants" },
        { id: 2, name: "Outdoor Plants" },
      ];

      prismaMock.category.findMany.mockResolvedValue(mockCategories);

      const categories = await categoryService.getCategories();
      expect(categories).toEqual(mockCategories);
      expect(prismaMock.category.findMany).toHaveBeenCalled();
    });
    it("should throw an error if findMany calls an unknown error", async () => {
      prismaMock.category.findMany.mockRejectedValue(new Error("DB Error"));

      await expect(categoryService.getCategories()).rejects.toThrow("DB Error");
      expect(prismaMock.category.findMany).toHaveBeenCalled();
    });
  });

  describe("createCategory", () => {
    it("should create a new category", async () => {
      const newCategory = { name: "Succulents" };
      const createdCategory: Category = { id: 3, name: "Succulents" };

      prismaMock.category.create.mockResolvedValue(createdCategory);

      const category = await categoryService.createCategory(newCategory);
      expect(category).toEqual(createdCategory);
      expect(prismaMock.category.create).toHaveBeenCalledWith({
        data: newCategory,
      });
    });

    it("should throw an error if the category name already exists", async () => {
      const newCategory = { name: "Indoor Plants" };

      prismaMock.category.create.mockRejectedValue({
        code: "P2002",
        message: "Unique constraint failed",
      });

      await expect(categoryService.createCategory(newCategory)).rejects.toThrow(
        "Category with this name already exists"
      );
      expect(prismaMock.category.create).toHaveBeenCalled();
    });

    it("should throw an error if createCategory calls an unknown error", async () => {
      const newCategory = { name: "Indoor Plants" };

      prismaMock.category.create.mockRejectedValue(new Error("DB Error"));

      await expect(categoryService.createCategory(newCategory)).rejects.toThrow(
        "DB Error"
      );
      expect(prismaMock.category.create).toHaveBeenCalledWith({
        data: newCategory,
      });
    });
  });
});
