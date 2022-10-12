import {NextFunction, Request, Response} from 'express';
import fund from '../services/Payment/fund';
import validate from '../services/Payment/validateTransaction';
import withdraw from '../services/Payment/withdraw';
import {AuthenticatedRequest} from '../utils/auth';

export default class PaymentController {
  public static Fund = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {
    const {userId} = req.session;
    try {
      const result = await fund({userId, ...req.body});
      res.send({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error)
    }
  };

  public static verifyTransaction = async (req: Request, res: Response, next:NextFunction) => {
    try {   
      const result = await validate(req.body);
      res.send({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error)
    }
  };

  public static withdrawal = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {
    const {userId} = req.session;
    try { 
      const result = await withdraw({userId, ...req.body});
      res.send({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error)
    }
  };
}
