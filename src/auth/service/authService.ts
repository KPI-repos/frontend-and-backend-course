import { injectable, inject } from "tsyringe";
import jwt from "jsonwebtoken";
import { UserService } from "@/user/service/userSerivce";
import { IUserService } from "@/user/interface/IUserService";
import { UserInput, UserWithId } from "@/user/types/user";
import { User } from "@prisma/client";
import { IAuthService } from "../interface/IAuthService";
import { AppError } from "@/utils/AppError";

@injectable()
export class AuthService implements IAuthService {
  constructor(@inject(UserService) private userService: IUserService) {}

  async register(data: UserInput): Promise<{ user: User; token: string }> {
    const user = await this.userService.createUser(data);
    const token = this.generateToken(user);
    return { user, token };
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const user = await this.userService.validateUser(email, password);
    const token = this.generateToken(user);
    return { user, token };
  }

  private generateToken(user: UserWithId): string {
    try {
      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_SECRET_EXPIRES as string,
      });
    } catch (error) {
      throw new AppError("Failed to generate token", 500);
    }
  }
}
