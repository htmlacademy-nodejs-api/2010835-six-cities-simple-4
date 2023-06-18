import {NextFunction, Request, Response} from 'express';
import HttpError from '../errors/http-error.js';
import { MiddlewareInterface } from './middleware.interface.js';
import { DocumentExistsInterface } from './document-exists.interface.js';

export class DocumentExistsMiddleware implements MiddlewareInterface {
  constructor(
    private readonly service: DocumentExistsInterface,
    private readonly entityName: string,
    private readonly paramName: string,
  ) {}

  public async execute({params}: Request, _response: Response, nextFunction: NextFunction): Promise<void> {
    const documentId = params[this.paramName];
    if (!await this.service.exists(documentId)) {
      throw new HttpError(
        401,
        `${this.entityName} with ${documentId} not found.`,
        'DocumentExistsMiddleware'
      );
    }

    nextFunction();
  }
}
