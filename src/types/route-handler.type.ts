import { Request, Response, NextFunction } from 'express';

export type RouteHandler = (request: Request, response: Response, next: NextFunction) => Promise<void>;
