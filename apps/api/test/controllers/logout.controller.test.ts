import logoutController from "../../app/module/auth/controllers/logout.controller";
import { Response, Request } from "express";
import { tokenService } from "../../app/module/auth/index.auth";

const mockResponse = () => {
  const res = {} as Response;
  res.clearCookie = vi.fn().mockReturnValue(res);
  res.status = vi.fn().mockReturnValue(res);
  res.end = vi.fn().mockReturnValue(res);
  return res;
};

describe('logout controller', () => {
  afterEach(() => {
    vi.resetAllMocks()
  }
  )
  it('should return 204 status', async () => {
    const mockRequest = {
      cookies: {
        _token: 'test'
      }
    } as Request;
    const req = mockRequest;
    const res = mockResponse();
    const next = vi.fn();
    tokenService.destroy = vi.fn().mockResolvedValue(true);

    await logoutController.logout(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
  })
  it('should call clearCookie with _token', async () => {
    const mockRequest = {
      cookies: {
        _token: 'test'
      }
    } as Request;
    const req = mockRequest;
    const res = mockResponse();
    const next = vi.fn();
    await logoutController.logout(req, res, next);
    expect(res.clearCookie).toHaveBeenCalledWith('_token');
    expect(res.end).toHaveBeenCalled();
  })
  it('should call tokenService.destroy', async () => {
    const mockRequest = {
      cookies: {
        _token: 'test'
      }
    } as Request;
    const req = mockRequest;
    const res = mockResponse();
    const next = vi.fn();
    tokenService.destroy = vi.fn().mockResolvedValue(true);

    await logoutController.logout(req, res, next);
    expect(tokenService.destroy).toHaveBeenCalledWith(req.cookies._token);
    expect(res.end).toHaveBeenCalled();
  })
});