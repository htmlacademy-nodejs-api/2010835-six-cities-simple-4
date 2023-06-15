import { Request, Response } from 'express';

export type RouteHandler = (request: Request, response: Response) => Promise<void>;
