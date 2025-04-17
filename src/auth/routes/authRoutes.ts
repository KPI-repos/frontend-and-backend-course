import { Router } from "express";
import { container } from "@/di/container";
import { AuthController } from "../controller/authController";
import { validateRequest } from "@/middlewares/validateRequest";
import { UserSchema } from "@/user/types/user";

const router = Router();
const authController = container.resolve(AuthController);

router.post("/register", validateRequest(UserSchema), authController.register);
router.post("/login", validateRequest(UserSchema), authController.login);

export default router;
