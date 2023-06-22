import { NextFunction, Request, Response } from 'express';
import { MiddlewareInterface } from './middleware.interface.js';
import HttpError from '../errors/http-error.js';

export class PrivateRouteMiddleware implements MiddlewareInterface {
  public async execute({ user }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (! user) {
      throw new HttpError(
        401,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
