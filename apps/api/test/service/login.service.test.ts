import LoginService from "../../app/module/auth/services/login.service";
import { UserModel } from '../../app/module/auth/models/user.model';
import TokenService from '../../app/module/auth/services/token.service';
import bcrypt from 'bcrypt';
import { UserError } from '../../app/helpers/exceptions/user.error';
import { TokenModel } from "../../app/module/auth/models/token.model";

describe('LoginService', () => {
  let loginService: LoginService;
  let db: any = {}
  let fakeUserModel = new UserModel(db)
  let fakeTokenModel = new TokenModel(db)
  let tokenServiceMock = new TokenService(fakeTokenModel)

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns an error if the user does not exist', async () => {
    fakeUserModel.findByEmail = vi.fn().mockResolvedValue(null)
    fakeUserModel.store = vi.fn().mockResolvedValue(true)
    tokenServiceMock.create = vi.fn().mockResolvedValue('token')
    tokenServiceMock.verify = vi.fn().mockResolvedValue(true)
    loginService = new LoginService(fakeUserModel as UserModel, tokenServiceMock as TokenService);

    const result = await loginService.login('nonexistent@example.com', 'password');

    expect(fakeUserModel.findByEmail).toHaveBeenCalledWith('nonexistent@example.com');
    expect(result).toBeInstanceOf(UserError);
    expect((result)).toHaveProperty('message', 'Bad credentials');
  });
  it('should be call comparePassword with correct arguments', async () => {
    fakeUserModel.findByEmail = vi.fn().mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashedpassword' });
    fakeUserModel.store = vi.fn().mockResolvedValue(true)
    tokenServiceMock.create = vi.fn().mockResolvedValue('token')
    tokenServiceMock.verify = vi.fn().mockResolvedValue(true)
    loginService = new LoginService(fakeUserModel as UserModel, tokenServiceMock as TokenService);

    vi.spyOn(bcrypt, 'compare').mockImplementation((password, hash) => {
      return Promise.resolve(password === hash);
    });
    await loginService.login('test@example.com', 'matchpassword');

    expect(fakeUserModel.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('matchpassword', 'hashedpassword');
  });
  it('should be create a token if password are matching', async () => {
    fakeUserModel.findByEmail = vi.fn().mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashedpassword' });
    fakeUserModel.store = vi.fn().mockResolvedValue(true)
    tokenServiceMock.create = vi.fn().mockResolvedValue('token')
    tokenServiceMock.verify = vi.fn().mockResolvedValue(true)
    loginService = new LoginService(fakeUserModel as UserModel, tokenServiceMock as TokenService);

    vi.spyOn(bcrypt, 'compare').mockImplementation((password, hash) => {
      return Promise.resolve(true);
    });
    await loginService.login('test@example.com', 'matchpassword');

    expect(tokenServiceMock.create).toHaveBeenCalledWith(1);
  });
  it('should return an User Error if the password does not match', async () => {
    fakeUserModel.findByEmail = vi.fn().mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashedpassword' });
    fakeUserModel.store = vi.fn().mockResolvedValue(true)
    tokenServiceMock.create = vi.fn().mockResolvedValue('token')
    tokenServiceMock.verify = vi.fn().mockResolvedValue(true)
    loginService = new LoginService(fakeUserModel as UserModel, tokenServiceMock as TokenService);

    vi.spyOn(bcrypt, 'compare').mockImplementation((password, hash) => {
      return Promise.resolve(password === hash);
    });

    const result = await loginService.login('test@example.com', 'nothashedpassword');

    expect(result).toBeInstanceOf(UserError);
    expect((result)).toHaveProperty('message', 'Bad credentials');
  })
  it('should return a token if the password does match', async () => {
    fakeUserModel.findByEmail = vi.fn().mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashedpassword' });
    fakeUserModel.store = vi.fn().mockResolvedValue(true)
    tokenServiceMock.create = vi.fn().mockResolvedValue('token')
    tokenServiceMock.verify = vi.fn().mockResolvedValue(true)
    loginService = new LoginService(fakeUserModel as UserModel, tokenServiceMock as TokenService);

    const result = await loginService.login('test@example.com', 'hashedpassword');

    expect(result).toBe('token');
  })
});