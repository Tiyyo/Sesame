import { Router } from 'express';
import productsController from './controllers/products.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';


const router: Router = Router();

router.route('/products').get(AuthMiddleware.authenticate, productsController.handle('getAll'))

export default router