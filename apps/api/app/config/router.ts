import { Router } from 'express';
import { ErrorHandler } from '../middleware/errors.handler';
import authRouter from '../module/auth/auth.routes'
import productsRouter from '../module/products/products.routes'

const router: Router = Router();

router.use('/api', authRouter)
router.use('/api', productsRouter)

router.use((_req, res, next) => {
  console.error('Could not match any routes : Error 404');
  res.status(404).json({ error: 'Route Not Found', status: 404 });
});

router.use(ErrorHandler.handle)

export default router;
