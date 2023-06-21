import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { HttpMethod } from '../../types/http-methods.enum.js';
import { RouteHandler } from '../../types/route-handler.type.js';
import asyncHandler from 'express-async-handler';
import { MiddlewareInterface } from '../middleware/middleware.interface.js';
import { RequestHandler } from 'express-serve-static-core';

@injectable()
export abstract class ControllerAbstract{
  protected router: Router;
  protected middlewares: RequestHandler[] | undefined;

  constructor(){
    this.router = Router();
  }

  public getRouter(): Router{
    return this.router;
  }

  public addRoute(routePath: string, httpMethod: HttpMethod, routeHandler: RouteHandler, middlewares?: MiddlewareInterface[]) {
    const handler = asyncHandler((routeHandler.bind(this)));
    this.middlewares = middlewares?.map((middleware) => asyncHandler(middleware.execute.bind(middleware)));

    const allHandlers = this.middlewares ? [...this.middlewares, handler] : handler;

    this.router[httpMethod](routePath, allHandlers);
  }

  protected ok<T>(response: Response, data: T) {
    response.status(200).send(data);
  }

  protected created<T>(response: Response, data: T) {
    response.status(201).send(data);
  }

  protected noContent(response: Response) {
    response.status(204).send();
  }

  protected badRequest(response: Response) {
    response.status(400).send();
  }

  protected unauthorized(response: Response) {
    response.status(401).send();
  }

  protected forbidden(response: Response) {
    response.status(403).send();
  }

  protected notFound(response: Response) {
    response.status(404).send();
  }

  protected conflict(response: Response) {
    response.status(409).send();
  }

  protected internalServerError(response: Response) {
    response.status(500).send();
  }

  protected notImplemented(response: Response) {
    response.status(501).send();
  }
}
