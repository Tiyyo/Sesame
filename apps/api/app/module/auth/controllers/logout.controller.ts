import { Request, Response, NextFunction } from 'express';
import { CoreController } from '../../../helpers/controller';
import { tokenService } from '../index.auth';

class LogoutController extends CoreController {
  constructor() {
    super();
  }

  async logout(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];
    res.clearCookie('_token');
    // Auth.middleware check if token is present and valid
    // so we can safely assume that token is present
    await tokenService.destroy(token!);

    return res.status(204).end();
  }
}

export default new LogoutController();