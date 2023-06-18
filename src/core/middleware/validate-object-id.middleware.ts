import { Types } from 'mongoose';
import { MiddlewareInterface } from './middleware.interface.js';
import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/http-error.js';

export class ValidateObjectIdMiddleware implements MiddlewareInterface {
  private requestParamName: string;

  constructor(requestParamName: string) {
    this.requestParamName = requestParamName;
  }

  public execute(request: Request, _response: Response, nextFunction: NextFunction) {
    const { params } = request;

    if (Types.ObjectId.isValid(params[this.requestParamName])) {
      return nextFunction();
    }

    throw new HttpError(
      400,
      `${params[this.requestParamName]} is invalid ObjectId.`,
      'ValidateObjectIdMiddleware'
    );
  }
}
