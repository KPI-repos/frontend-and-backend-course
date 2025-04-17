import "reflect-metadata";
import { container } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { ICareGuideService } from "@/care-guide/interface/ICareGuideService";
import { CareGuideService } from "@/care-guide/service/careGuideService";
import { IPlantService } from "@/plant/interface/IPlantService";
import { PlantService } from "@/plant/service/plantService";
import { ICategoryService } from "@/category/interface/ICategoryService";
import { CategoryService } from "@/category/service/categoryService";
import { IUserService } from "@/user/interface/IUserService";
import { AuthService } from "@/auth/service/authService";
import { UserService } from "@/user/service/userSerivce";
import { IAuthService } from "@/auth/interface/IAuthService";

container.register<PrismaClient>("PrismaClient", {
  useValue: new PrismaClient(),
});
container.registerSingleton<ICategoryService>(
  "ICategoryService",
  CategoryService
);
container.registerSingleton<IPlantService>("IPlantService", PlantService);
container.registerSingleton<ICareGuideService>(
  "ICareGuideService",
  CareGuideService
);

container.registerSingleton<IUserService>("IUserService", UserService);
container.registerSingleton<IAuthService>("IAuthService", AuthService);

export { container };
