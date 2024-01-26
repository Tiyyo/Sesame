import { Request, Response, NextFunction } from 'express';
export type ExpressController = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export default (controller: ExpressController) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
