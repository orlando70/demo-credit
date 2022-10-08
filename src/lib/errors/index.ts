// eslint-disable-next-line max-classes-per-file
export class GenericError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode = 400) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class ServiceError extends GenericError {
    static statusCode = 400;
  }
  
  export class NotFoundError extends GenericError {
    static statusCode = 404;
  
    constructor(message: string) {
      super(message, NotFoundError.statusCode);
    }
  }
  
  export class ValidationError extends GenericError {
    public errors: string[];
  
    static statusCode = 422;
  
    constructor(errors: string[] = []) {
      const message = `${errors[0]}`;
      super(message, ValidationError.statusCode);
      this.errors = errors;
    }
  }
  
  export class AuthenticationError extends GenericError {
    static statusCode = 401;
  
    constructor(message: string) {
      super(message, AuthenticationError.statusCode);
    }
  }
  
  export class AuthorizationError extends GenericError {
    static statusCode = 403;
  
    constructor(message = 'you are not authorized to perform this action') {
      super(message, AuthorizationError.statusCode);
    }
  }
  