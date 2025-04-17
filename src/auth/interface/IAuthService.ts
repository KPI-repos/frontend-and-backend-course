import { User } from "@prisma/client";
import { UserInput, UserWithId } from "@/user/types/user";

export interface IAuthService {
  register(data: UserInput): Promise<{ user: User; token: string }>;
  login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }>;
}
