import { generateToken } from "../../../utils/create.token";
import { TokenModel } from "../models/token.model";

export abstract class TokenAuthError {
  declare error: number
  declare message: string
}

export default class TokenService {

  constructor(private readonly tokenModel: TokenModel) {
  }

  public create(userId: number) {
    const token = generateToken();
    const now = new Date();
    const expiresAt = new Date(now)
    expiresAt.setDate(now.getDate() + 30)
    this.tokenModel.store({ id: token, userId, expiresAt: expiresAt.toISOString() })

    return token
  }
  public async verify(token: string) {
    const tokenDb = await this.tokenModel.find(token)

    if (!tokenDb) {
      return { error: 401, message: 'Unauthorized' } as TokenAuthError
    }
    const now = new Date()
    const expiresAt = new Date(tokenDb.expires_at)
    if (now > expiresAt) {
      this.tokenModel.destroy(token)
      return { error: 401, message: 'Token expired' } as TokenAuthError
    }
    return tokenDb.user_id
  }
  public async destroy(token: string) {
    this.tokenModel.destroy(token)
  }
}