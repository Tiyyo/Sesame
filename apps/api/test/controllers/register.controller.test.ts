import registerController from "../../app/module/auth/controllers/register.controller";
import { Request, Response } from "express";
import { registerService } from "../../app/module/auth/index.auth";
import { UserError } from "../../app/helpers/exceptions/user.error";

const mockResponse = () => {
  const res = {} as Response;
  res.cookie = vi.fn().mockReturnValue(res);
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('register controller', () => {
  afterEach(() => {
    vi.resetAllMocks()
  }
  )
  const mockRequest = {
    body: {
      email: 'test@test.com',
      password: '123456',
    },
  } as Request;

  it('next should be called if response is undefined', async () => {
    const req = mockRequest;
    const res = mockResponse();
    const next = vi.fn();
    registerService.register = vi.fn().mockResolvedValue(undefined);

    await registerController.register(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Something went wrong'));
  }
  )
  it('should return error if response is instance of UserError', async () => {
    const req = mockRequest;
    const res = mockResponse();
    const next = vi.fn();
    registerService.register = vi.fn().mockResolvedValue(new UserError('User already exist'));

    await registerController.register(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'User already exist' });
  })
  it('should return success with status 200 if response is not instance of UserError', async () => {
    const req = mockRequest;
    const res = mockResponse();
    const next = vi.fn();
    registerService.register = vi.fn().mockResolvedValue(true);

    await registerController.register(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'success' });
  })
})
