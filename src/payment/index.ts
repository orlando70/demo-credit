import {Request, Response, NextFunction} from 'express';
import crypto from 'crypto';
import Transfer from './Transfer';
import Charge from './Charge';
import Transactions from './Transactions';
import Verify from './Verify';

export default class PayStack {
  charge: Charge;

  transfer: Transfer;

  transaction: Transactions;

  verify: Verify;

  constructor(key: string) {
    this.charge = new Charge(key);
    this.verify = new Verify(key);
    this.transfer = new Transfer(key);
    this.transaction = new Transactions(key);
  }

  static webHook =
    (secret: string) => (req: Request, res: Response, next: NextFunction) => {
      try {
        const hash = crypto
          .createHmac('sha512', secret) //
          .update(JSON.stringify(req.body))
          .digest('hex');

        if (hash === req.headers['x-paystack-signature']) {
          res.sendStatus(200);
          next();
        } else {
          res.sendStatus(401);
        }
      } catch (err) {
        res.sendStatus(400);
      }
    };
}
