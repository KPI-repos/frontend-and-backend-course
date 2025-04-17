import { injectable, inject } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/authService";
import { IAuthService } from "../interface/IAuthService";

@injectable()
export class AuthController {
  constructor(@inject(AuthService) private authService: IAuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, token } = await this.authService.register(req.body);
      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
