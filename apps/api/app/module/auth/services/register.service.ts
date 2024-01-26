import { APIError } from "../../../helpers/exceptions/api.error";
import { UserError } from "../../../helpers/exceptions/user.error";
import { UserModel } from "../models/user.model";
import { hash } from 'bcrypt'

export default class RegisterService {
  declare user: UserModel

  constructor(private userModel: UserModel) {
  }

  public async register(email: string, password: string) {
    const isExist = await this.isExist(email)
    if (isExist) {
      return new UserError('User already exist')
    }
    const hashPassword = await this.hashPassword(password)
    const user = await this.createUser(email, hashPassword)
    return user
  }
  private async hashPassword(password: string) {
    const saltRounds = 10
    try {
      const hashPassword = hash(password, saltRounds)
      return hashPassword
    } catch (error) {
      throw new APIError('Error hashing password')
    }
  }
  private async isExist(email: string): Promise<boolean> {
    try {
      return !!await this.userModel.findByEmail(email)
    } catch (error) {
      return false
    }
  }
  private async createUser(email: string, password: string) {
    return await this.userModel.store(email, password)
  }
}