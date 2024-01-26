import getMeController from "../../app/module/auth/controllers/get-me.controller";
import { Request, Response } from "express";
import { tokenService } from "../../app/module/auth/index.auth";

const mockResponse = () => {
  const res = {} as Response;
  res.cookie = vi.fn().mockReturnValue(res);
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('get me controller', () => {
  afterEach(() => {
    vi.resetAllMocks()
  }
  )
  it('should called tokenService with token if present in cookie', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Barear test'
      }
    } as Request;
    const res = mockResponse();
    tokenService.verify = vi.fn().mockResolvedValue(true)

    await getMeController.me(mockRequest, res);
    expect(tokenService.verify).toHaveBeenCalledWith('test');
  })
  it('should return userId if token is valid', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Barear test'
      }
    } as Request;
    const res = mockResponse();
    tokenService.verify = vi.fn().mockResolvedValue(8)
    await getMeController.me(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ userId: 8 });
  })
})