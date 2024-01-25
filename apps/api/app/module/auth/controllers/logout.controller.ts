import { Request, Response, NextFunction } from 'express';
import { CoreController } from '../../../helpers/controller';
import { tokenService } from '../index.auth';

class LogoutController extends CoreController {
  constructor() {
    super();
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies._token;
    res.clearCookie('_token');
    await tokenService.destroy(token)

    return res.status(204).end();
  }
}

export default new LogoutController();