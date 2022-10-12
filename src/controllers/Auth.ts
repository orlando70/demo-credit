import {NextFunction, Request, Response} from 'express';
import * as AuthService from '../services/Auth/index'

export default class AuthController {
  public static Register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const result = await AuthService.register(req.body);
      res.send({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error)
    }
  };

  public static Login = async (req: Request, res: Response, next: NextFunction) => {
    try { 
      const result = await AuthService.login(req.body);
      res.send({
        success: true,
        data: result,
      });

    } catch (error: any) {
      next(error);
    }
  };
}
