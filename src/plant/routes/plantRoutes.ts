import { Router } from "express";
import PlantController from "../controller/plantController";
import { container } from "@/di/container";
import { validateRequest } from "@/middlewares/validateRequest";
import { PlantSchema } from "../types/plant";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = Router();
const plantController = container.resolve(PlantController);

router.use(authMiddleware);
router.post("/", validateRequest(PlantSchema), plantController.createPlant);
router.get("/", plantController.getPlants);

export default router;
