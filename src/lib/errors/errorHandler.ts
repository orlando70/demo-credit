import { Request, Response, NextFunction } from 'express';
import {
  GenericError,
  ServiceError,
  NotFoundError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
} from './index';

const logError = (err: any, req: Request) => {
    console.log(
        {url: req.originalUrl,
        method: req.method,
        body: req.body,
        stack: err.stack,}
    );
};

export default (err: GenericError, req: Request, res: Response, next: NextFunction): void | Response => {
  if (res.headersSent) {
    return next(err);
  }
  switch (err.statusCode) {
    case ServiceError.statusCode:
    case NotFoundError.statusCode:
    case AuthenticationError.statusCode:
    case AuthorizationError.statusCode:
      // if (config.env.isTest) logError(err, req);
      return res.status(err.statusCode).send({
        status: 'error',
        message: err.message,
      });
    case ValidationError.statusCode:
      // if (config.env.isTest) logError(err, req);
      return res.status(err.statusCode).send({
        status: 'error',
        message: err.message,
        errors: (err as ValidationError).errors,
      });
    default:
      logError(err, req);
      return res.status(500).send({
        status: 'error',
        message: 'an error occurred',
      });
  }
};
