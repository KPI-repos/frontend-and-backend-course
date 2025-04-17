import { User } from "@prisma/client";
import { UserInput } from "../types/user";

export interface IUserService {
  createUser(data: UserInput): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  validateUser(email: string, password: string): Promise<User>;
}
