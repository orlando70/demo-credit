import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError as CValidationError } from 'class-validator';
import { ValidationError } from '../lib/errors';

export const getAllConstraints = (errors: CValidationError[]): Record<string, string>[] => {
  const constraints = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const error of errors) {
    if (error.constraints) {
      constraints.push(error.constraints);
    }
    if (error.children) {
      constraints.push(...getAllConstraints(error.children));
    }
  }

  return constraints;
};

export function wrapServiceAction<T, V extends (args: any) => any>(params: {
  schema: ClassConstructor<T>;
  handler: V;
}): (...funcArgs: Parameters<V>) => Promise<ReturnType<V>> {
  return async (...args: Parameters<V>): Promise<ReturnType<V>> => {
    const transformed = <Record<string, never>>plainToClass<T, unknown>(params.schema, args[0]);
    const errors = await validate(transformed, {
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false },
    });
    if (errors.length > 0) {
      const constraints = getAllConstraints(errors);
      throw new ValidationError(constraints.map((c) => Object.values(c)).flat());
    }
    return params.handler(transformed);
  };
}
