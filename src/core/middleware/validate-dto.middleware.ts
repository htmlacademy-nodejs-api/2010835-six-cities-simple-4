import { ClassConstructor, plainToInstance } from 'class-transformer';
import { MiddlewareInterface } from '../../types/middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';

export class ValidateDtoMiddleware implements MiddlewareInterface {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute({body}: Request, res: Response, nextFunction: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // if (errors.length > 0) {
    //   throw new HttpError(
    //     400,
    //     errors.toString(),
    //     'ValidateObjectIdMiddleware'
    //   );
    // }

    nextFunction();
  }
}
