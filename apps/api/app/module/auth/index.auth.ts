import RegisterService from "./services/register.service";
import { UserModel } from "./models/user.model";
import { db } from "../../config/db.client";
import TokenService from "./services/token.service";
import LoginService from "./services/login.service";
import { TokenModel } from "./models/token.model";

const userModel = new UserModel(db);
const tokenModel = new TokenModel(db);


/* register service */
export const registerService = new RegisterService(userModel);

/* token service */
export const tokenService = new TokenService(tokenModel);

/*login service */
export const loginService = new LoginService(userModel, tokenService);