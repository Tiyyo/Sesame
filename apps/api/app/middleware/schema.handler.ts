import { NextFunction, Request, Response } from 'express';
import type { ZodType, ZodTypeDef } from '@sesame/schema/src';
import { ZodError } from '@sesame/schema/src';
import { APIError } from '../helpers/exceptions/api.error';
import { ValidationError } from '../helpers/exceptions/validation.error';

export const canals = {
  body: 'body',
  params: 'params',
  query: 'query'
} as const

export function validateSchema(
  schema: ZodType<unknown, ZodTypeDef, unknown>,
  canal: 'body' | 'params' | 'query',
) {
  return async function (request: Request, _res: Response, next: NextFunction) {
    if (!schema) return next(new APIError('This route required a schema to validate'));
    try {
      await schema.parseAsync(request[canal]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErros: Record<string, string> = {};
        error.issues.map((e) => {
          return (fieldErros[e.path[0]] = e.message);
        });
        next(new ValidationError('Schema is not valid', fieldErros));
      }
      next(error);
    }
  };
}
