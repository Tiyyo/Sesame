import { NextFunction, Request, Response } from 'express';
import { MethodNotImplementedError } from '../helpers/exceptions/method.error';
import { DatabaseError } from '../helpers/exceptions/database.error';
import { APIError } from '../helpers/exceptions/api.error';
import { ValidationError } from '../helpers/exceptions/validation.error';
import { UnauthorizedError } from '../helpers/exceptions/unauthorized.error';

export class ErrorHandler {

  public static async handle(err: unknown, req: Request, res: Response, next: NextFunction) {
    /* handle expections here */
    if (
      err instanceof MethodNotImplementedError ||
      err instanceof DatabaseError ||
      err instanceof APIError ||
      err instanceof ValidationError ||
      err instanceof UnauthorizedError
    ) {
      console.log(`${err.name} : ${err.message}`)
      return res.status(err.status).json({ error: err.userMessage });
    }
    return res.status(500).json({ message: 'internal server error' });
  }
}