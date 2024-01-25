import RegisterService from "../../app/module/auth/services/register.service";
import { UserModel } from "../../app/module/auth/models/user.model";
import { UserError } from "../../app/helpers/exceptions/user.error";

describe('RegisterService', () => {
  let registerService: RegisterService;
  let db: any = {};
  let userModelMock = new UserModel(db);

  beforeEach(() => {
    registerService = new RegisterService(userModelMock as unknown as UserModel);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns an error if user already exists', async () => {
    userModelMock.findByEmail = vi.fn().mockResolvedValue(true);

    const result = await registerService.register('existing@example.com', 'password');

    expect(userModelMock.findByEmail).toHaveBeenCalledWith('existing@example.com');
    expect(result).toBeInstanceOf(UserError);
    expect(result).toHaveProperty('message', 'User already exist');
  });

  it('creates a new user by hashing password', async () => {
    userModelMock.findByEmail = vi.fn().mockResolvedValue(false);
    userModelMock.store = vi.fn().mockResolvedValue({ id: 1, email: 'new@example.com' });

    const result = await registerService.register('new@example.com', 'password');

    expect(userModelMock.findByEmail).toHaveBeenCalledWith('new@example.com');
    expect(userModelMock.store).toHaveBeenCalledWith('new@example.com', expect.any(String));
    expect(result).toEqual({ id: 1, email: 'new@example.com' });
  });
});