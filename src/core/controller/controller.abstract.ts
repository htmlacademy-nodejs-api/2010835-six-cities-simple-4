import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { HttpMethod } from '../../types/http-methods.enum';
import { RouteHandler } from '../../types/route-handler.type';

@injectable()
export abstract class ControllerAbstract{
  protected router: Router;

  constructor(){
    this.router = Router();
  }

  public getRouter(): Router{
    return this.router;
  }

  protected addRoute(routePath: string, httpMethod: HttpMethod, routeHandler: RouteHandler) {
    this.router[httpMethod](routePath, routeHandler.bind(this));
  }

  protected ok<T>(response: Response, data: T) {
    response.status(200).send(data);
  }

  protected created<T>(response: Response, data: T) {
    response.status(201).send(data);
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
