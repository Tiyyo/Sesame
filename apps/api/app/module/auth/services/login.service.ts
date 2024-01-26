import { UserError } from "../../../helpers/exceptions/user.error";
import TokenService from "../services/token.service";
import { UserModel } from "../models/user.model";
import bcrypt from 'bcrypt'

export default class LoginService {
  declare user: UserModel

  constructor(private userModel: UserModel, private tokenService: TokenService) {
  }

  public async login(email: string, password: string) {
    const isExist = await this.isExist(email)

    if (isExist instanceof UserError || !isExist) {
      return isExist
    }
    const isPasswordMatch = await this.comparePassword(password, isExist.password)
    if (isPasswordMatch instanceof UserError || !isPasswordMatch) {
      return new UserError('Bad credentials')
    }

    return this.tokenService.create(isExist.id)

  }
  private async comparePassword(passwordClient: string, hashDb: string) {
    try {
      return await bcrypt.compare(passwordClient, hashDb)
    } catch (error) {
      return new UserError('Bad credentials')
    }
  }
  private async isExist(email: string): Promise<{ id: number, email: string, password: string } | UserError> {
    try {
      const user = await this.userModel.findByEmail(email)
      return user ? user : new UserError('Bad credentials')
    } catch (error) {
      return new UserError('Bad credentials')
    }
  }
}