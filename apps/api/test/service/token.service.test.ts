import { TokenModel } from "../../app/module/auth/models/token.model";
import TokenService from "../../app/module/auth/services/token.service";


describe('TokenService', () => {
  let tokenService: TokenService;
  let db: any = {};
  let fakeTokenModel = new TokenModel(db);
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01'));
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('creates a new token and stores it', () => {
    fakeTokenModel.store = vi.fn().mockResolvedValue(true);
    tokenService = new TokenService(fakeTokenModel);
    const userId = 1;
    const token = tokenService.create(userId);

    expect(token).toBeTruthy();
    expect(token).toBeTypeOf('string');
    expect(token.length).toBe(128);
    expect(fakeTokenModel.store).toHaveBeenCalledWith({ id: token, userId, expiresAt: '2024-01-31T00:00:00.000Z' });
  });

  it('verifies a token successfully', async () => {
    const mockUserId = 1;
    const mockToken = 'valid_token';
    const mockExpiresAt = new Date(Date.now() + 1000000).toISOString();
    fakeTokenModel.find = vi.fn().mockResolvedValue({ user_id: mockUserId, expires_at: mockExpiresAt });
    tokenService = new TokenService(fakeTokenModel);

    const result = await tokenService.verify(mockToken);

    expect(fakeTokenModel.find).toHaveBeenCalledWith(mockToken);
    expect(result).toBe(mockUserId);
  });

  it('returns an error for an invalid token', async () => {
    fakeTokenModel.find = vi.fn().mockResolvedValue(null);
    tokenService = new TokenService(fakeTokenModel);

    const result = await tokenService.verify('invalid_token');

    expect(result).toEqual(expect.objectContaining({ error: 401, message: 'Unauthorized' }));
  });

  it('returns an error for an expired token', async () => {
    // Reminder that the fake timer is set to 2024-01-01
    const mockExpiresAt = new Date('2023-01-01').toISOString();
    fakeTokenModel.find = vi.fn().mockResolvedValue({ user_id: 1, expires_at: mockExpiresAt, id: 'expired_token' });
    fakeTokenModel.destroy = vi.fn().mockResolvedValue(true);
    tokenService = new TokenService(fakeTokenModel);
    const expiredToken = 'expired_token';

    const result = await tokenService.verify(expiredToken);

    expect(fakeTokenModel.destroy).toHaveBeenCalledWith(expiredToken);
    expect(result).toEqual(expect.objectContaining({ error: 401, message: 'Token expired' }));
  });

  it('destroys a token', async () => {
    tokenService = new TokenService(fakeTokenModel);
    fakeTokenModel.destroy = vi.fn().mockResolvedValue(true);
    const token = 'token_to_destroy';

    await tokenService.destroy(token);

    expect(fakeTokenModel.destroy).toHaveBeenCalledWith(token);
  });
});