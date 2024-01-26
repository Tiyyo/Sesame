import { NextFunction, Request, Response } from "express";
import asyncHandler, { ExpressController } from "./async.handler";
import { MethodNotImplementedError } from "./exceptions/method.error";

export class CoreController {
  constructor() {
    this.handle = this.handle.bind(this)
  }
  handle<T extends this>(method: keyof T) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!this[method as keyof this]) {
        return next(new MethodNotImplementedError(`Method '${method as string}' not implemented in ${this.constructor.name}`))
      } else {
        return asyncHandler(this[method as keyof this] as ExpressController)(req, res, next)
      }
    }
  }
}