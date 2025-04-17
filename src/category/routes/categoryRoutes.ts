import { Router } from "express";
import { container } from "@/di/container";
import CategoryController from "../controller/categoryController";
import { validateRequest } from "@/middlewares/validateRequest";
import { CategorySchema } from "../types/category";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = Router();
const categoryController = container.resolve(CategoryController);

// router.use(authMiddleware);
router.post(
  "/",
  validateRequest(CategorySchema),
  categoryController.createCategory
);
router.get("/", categoryController.getCategories);

export default router;
