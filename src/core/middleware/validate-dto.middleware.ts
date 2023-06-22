import { ClassConstructor, plainToInstance } from 'class-transformer';
import { MiddlewareInterface } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import ValidationError from '../errors/validation-error.js';
import { transformErrors } from '../../utils/common.js';

export class ValidateDtoMiddleware implements MiddlewareInterface {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute(request: Request, _response: Response, nextFunction: NextFunction): Promise<void> {
    const { body } = request;
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new ValidationError(`Validation error: "${request.path}"`, transformErrors(errors));
    }

    nextFunction();
  }
}
