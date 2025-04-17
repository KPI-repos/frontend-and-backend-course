import { injectable, inject } from "tsyringe";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserInput } from "../types/user";
import { IUserService } from "../interface/IUserService";
import { AppError } from "@/utils/AppError";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient
  ) {}

  async createUser(data: UserInput): Promise<User> {
    // Check if user with this email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError("Email already in use", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }
    return user;
  }
}
