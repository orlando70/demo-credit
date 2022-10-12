import { NextFunction, Request, Response } from 'express';
import transfer from '../services/Wallet/transfer';
import { AuthenticatedRequest } from '../utils/auth';

export default class WalletController {
  public static Transfer = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    try {
      const result = await transfer({ userId: userId, ...req.body });

      res.send({
        success: true,
        message: 'transfer successful',
        data: result,
      });
      
    } catch (error) {
      next(error)
    }
  };
}
