import { Request, Response, NextFunction } from 'express';
import { CoreController } from '../../../helpers/controller';
import { productService } from '../index.products';



class ProductController extends CoreController {

  constructor() {
    super();
    this.getAll = this.getAll.bind(this);
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    const products = await productService.get();

    if (products.error) {
      return res.status(products.status).json({ error: products.error });
    }

    return res.status(200).json({ success: true, data: products });
  }
}

export default new ProductController();