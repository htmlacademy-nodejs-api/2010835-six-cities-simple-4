import { inject, injectable } from 'inversify';
import { ApplicationComponent } from '../../types/application-component.type.js';
import { LoggerInterface } from '../../modules/logger/logger.interface.js';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import ValidationError from '../errors/validation-error.js';
import { Request, Response } from 'express-serve-static-core';
import { NextFunction } from 'connect';
import { createErrorObject } from '../../utils/common.js';
import { ServiceError } from '../../types/service-error.enum.js';

@injectable()
export default class ValidationExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationException]: ${error.message}`);

    error.details.forEach(
      (errorField) => this.logger.error(`[${errorField.property}] — ${errorField.messages}`)
    );

    res
      .status(400)
      .json(createErrorObject(ServiceError.ValidationError, error.message, error.details));
  }
}
