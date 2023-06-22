import { NextFunction, Request, Response } from 'express';
import { MiddlewareInterface } from './middleware.interface.js';
import { jwtVerify } from 'jose';
import { createSecretKey } from 'node:crypto';
import HttpError from '../errors/http-error.js';

export class AuthenticateMiddleware implements MiddlewareInterface {
  private jwtSecret: string;

  constructor(jwtSecret: string) {
    this.jwtSecret = jwtSecret;
  }

  public async execute(request: Request, _response: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = request.headers?.authorization?.split(' ');
    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const { payload } = await jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));
      request.user = { email: payload.email as string, id: payload.id as string };
      return next();
    } catch {

      return next(new HttpError(
        401,
        'Invalid token',
        'AuthenticateMiddleware')
      );
    }
  }
}
