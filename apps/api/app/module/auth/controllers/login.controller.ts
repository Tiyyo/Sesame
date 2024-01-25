import { Request, Response, NextFunction } from 'express';
import { CoreController } from '../../../helpers/controller';
import { loginService } from '../index.auth';
import { UserError } from '../../../helpers/exceptions/user.error';

class LoginController extends CoreController {
  constructor() {
    super();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const response = await loginService.login(email, password)

    if (response instanceof UserError) {
      return res.status(response.status).json({ error: response.message });
    }
    // Should have secure flag and domain
    res.cookie('_token', response, { httpOnly: true });

    return res.status(200).json({ message: 'success' });
  }
}

export default new LoginController();