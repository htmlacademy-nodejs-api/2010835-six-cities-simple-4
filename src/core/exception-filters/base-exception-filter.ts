import { inject, injectable } from 'inversify';
import { ApplicationComponent } from '../../types/application-component.type.js';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { LoggerInterface } from '../../modules/logger/logger.interface.js';
import { createErrorObject } from '../../utils/common.js';
import { ServiceError } from '../../types/service-error.enum.js';
import { NextFunction, Request, Response } from 'express';

@injectable()
export default class BaseExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register BaseExceptionFilter');
  }

  public catch(error: Error, _request: Request, response: Response, _nextFunction: NextFunction) {
    this.logger.error(`[BaseException]: ${error.message}`);

    response
      .status(500)
      .json(createErrorObject(ServiceError.ServiceError, error.message));
  }
}
