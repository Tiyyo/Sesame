import { Request, Response, NextFunction } from 'express';
import { CoreController } from '../../../helpers/controller';
import { registerService } from '../index.auth';
import { UserError } from '../../../helpers/exceptions/user.error';


class RegisterController extends CoreController {
  constructor() {
    super();
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const response = await registerService.register(email, password);

    if (!response) {
      return next(new Error('Something went wrong'));
    }

    if (response instanceof UserError) {
      return res.status(response.status).json({ error: response.message });
    }

    return res.status(200).json({ message: 'success' });
  }
}

export default new RegisterController();