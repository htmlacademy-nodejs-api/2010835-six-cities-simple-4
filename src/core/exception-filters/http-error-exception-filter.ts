import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import HttpError from '../errors/http-error.js';
import { ServiceError } from '../../types/service-error.enum.js';
import { LoggerInterface } from '../../modules/logger/logger.interface.js';
import { ApplicationComponent } from '../../types/application-component.type.js';
import { createErrorObject } from '../../utils/common.js';

@injectable()
export default class HttpErrorExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`);

    res
      .status(400)
      .json(createErrorObject(ServiceError.CommonError, error.message));
  }
}
