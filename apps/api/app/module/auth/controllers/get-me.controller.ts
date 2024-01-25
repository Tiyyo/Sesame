import { CoreController } from "../../../helpers/controller"
import { tokenService } from "../index.auth"
import { Request, Response } from "express"

class GetMeController extends CoreController {
  constructor() {
    super()
  }

  async me(req: Request, res: Response) {
    const token = req.cookies._token
    const userId = await tokenService.verify(token)

    res.status(200).json({ userId })
  }
}

export default new GetMeController()