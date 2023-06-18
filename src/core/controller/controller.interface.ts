import { Router } from 'express';
import { MiddlewareInterface } from '../../types/middleware.interface.js';
import { RouteHandler } from '../../types/route-handler.type.js';
import { HttpMethod } from '../../types/http-methods.enum.js';

export interface ControllerInterface{
  getRouter(): Router;
  addRoute(routePath: string, httpMethod: HttpMethod, routeHandler: RouteHandler, _middlewares?: MiddlewareInterface[]): void;
}
