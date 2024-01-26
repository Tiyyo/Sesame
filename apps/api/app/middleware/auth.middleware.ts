import { UnauthorizedError } from "../helpers/exceptions/unauthorized.error";
import { tokenService } from "../module/auth/index.auth";
import { NextFunction, Request, Response } from "express";
import { TokenAuthError } from "../module/auth/services/token.service";


export class AuthMiddleware {
  static async authenticate(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      next(new UnauthorizedError('Unauthorized', "Auth middleware didn\'t find token to authenticate"));
      return
    }

    try {
      const user = await tokenService.verify(token);
      if (!user || user instanceof TokenAuthError) {
        throw new UnauthorizedError('Unauthorized', "Token is not asssociated with a user or have expired")
      }
      next();
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
}

