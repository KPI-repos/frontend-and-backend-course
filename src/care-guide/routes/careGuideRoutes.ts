import { Router } from "express";
import { container } from "@/di/container";
import { CareGuideController } from "@/care-guide/controller/careGuideController";
import { validateRequest } from "@/middlewares/validateRequest";
import { CareGuideSchema } from "../types/careGuide";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = Router();
const careGuideController = container.resolve(CareGuideController);

router.use(authMiddleware);
router.post(
  "/",
  validateRequest(CareGuideSchema),
  careGuideController.createCareGuide
);

export default router;
