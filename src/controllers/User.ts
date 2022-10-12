import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../utils/auth';
import * as UserService from '../services/User/index'

export default class UserController {
  public static Info = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    try {
      const result = await UserService.getInfo({ userId: userId, ...req.body });

      res.send({
        success: true,
        message: 'success',
        data: result,
      });
      
    } catch (error) {
      next(error)
    }
  };
}
