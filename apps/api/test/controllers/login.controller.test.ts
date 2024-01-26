import loginController from "../../app/module/auth/controllers/login.controller";
import { Request, Response } from "express";
import { loginService } from "../../app/module/auth/index.auth";
import { UserError } from "../../app/helpers/exceptions/user.error";

const mockResponse = () => {
  const res = {} as Response;
  res.cookie = vi.fn().mockReturnValue(res);
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('login controller', () => {
  afterEach(() => {
    vi.resetAllMocks()
  }
  )
  it('should return error if response is instance of UserError', async () => {
    const mockRequest = {
      body: {
        email: 'test@test.com',
        password: 'test',
      }
    } as Partial<Request>

    const req = mockRequest;
    const res = mockResponse();
    const next = vi.fn();
    loginService.login = vi.fn().mockResolvedValue(new UserError('Test error user'));

    await loginController.login(req as Request, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Test error user' });
  })
  it('should call loginService with correct arguments', async () => {
    const mockRequest = {
      body: {
        email: 'test@test.com',
        password: 'test',
      }
    } as Partial<Request>

    const req = mockRequest;
    const res = mockResponse();
    const next = vi.fn();
    loginService.login = vi.fn().mockResolvedValue(true);

    await loginController.login(req as Request, res, next);

    expect(loginService.login).toHaveBeenCalledWith(req.body.email, req.body.password);
  })
  it('should return success with status 200 if response is not instance of UserError', async () => {
    const mockRequest = {
      body: {
        email: 'test@test.com',
        password: 'test',
      }
    } as Partial<Request>
    const req = mockRequest;
    const res = mockResponse();
    const next = vi.fn();
    loginService.login = vi.fn().mockResolvedValue('test token');

    await loginController.login(req as Request, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
  })
  it('should set send a token with a success message if login is successful', async () => {
    const mockRequest = {
      body: {
        email: 'test@test.com',
        password: 'test',
      }
    } as Partial<Request>
    const req = mockRequest;
    const res = mockResponse();
    const next = vi.fn();
    loginService.login = vi.fn().mockResolvedValue('test token');

    await loginController.login(req as Request, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'success', _token: 'test token' }));
  }
  )
})  