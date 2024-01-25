import { Router } from 'express';
import { validateSchema as validate, canals } from '../../middleware/schema.handler';
import { registerSchema, loginSchema } from '@sesame/schema';
import loginController from './controllers/login.controller';
import registerController from './controllers/register.controller';
import logoutController from './controllers/logout.controller';
import GetMeController from './controllers/get-me.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';


const router: Router = Router();

router.route('/auth/login').post(validate(loginSchema, canals.body), loginController.handle('login'))

router.route('/auth/register').post(validate(registerSchema, canals.body), registerController.handle('register'))

router.route('/auth/me').get(AuthMiddleware.authenticate, GetMeController.handle('me'))

router.route('/auth/logout').delete(logoutController.handle('logout'))

export default router;