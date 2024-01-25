import { UnauthorizedError } from "../helpers/exceptions/unauthorized.error";
import { tokenService } from "../module/auth/index.auth";
import { NextFunction, Request, Response } from "express";
import { TokenAuthError } from "../module/auth/services/token.service";

export class AuthMiddleware {
  static async authenticate(req: Request, _res: Response, next: NextFunction) {
    const token = req.cookies._token;
    if (!token) {
      return next(new UnauthorizedError("Unauthorized", "Auth middleware didn\'t find token to authenticate"));
    }

    const user = await tokenService.verify(token);
    if (!user || user instanceof TokenAuthError) {
      return next(new UnauthorizedError("Unauthorized", "Token is not asssociated with a user or have expired"));
    }
    //@ts-ignore
    req.user = user;

    next();
  }
}