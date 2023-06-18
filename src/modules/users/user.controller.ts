import { Request, Response } from 'express';
import { ControllerAbstract } from '../../core/controller/controller.abstract.js';
import { inject, injectable } from 'inversify';
import { ApplicationComponent } from '../../types/application-component.type.js';
import { UserServiceInterface } from './user-service.interface.js';
import UserRdo from './rdo/user.rdo.js';
import { HttpMethod } from '../../types/http-methods.enum.js';
import CreateUserDto from './dto/create-user.dto.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { fillDTO } from '../../utils/common.js';
import { ValidateDtoMiddleware } from '../../core/middleware/validate-dto.middleware.js';
import GetUserByEmailDto from './dto/get-user-by-email.dto.js';

@injectable()
export class UserController extends ControllerAbstract {

  constructor(
    @inject(ApplicationComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(ApplicationComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
  ) {
    super();

    this.logger.info('Register routes for UserController…');

    this.addRoute('/index', HttpMethod.POST, this.getUserByEmail.bind(this), [new ValidateDtoMiddleware(GetUserByEmailDto)]);
    this.addRoute('/', HttpMethod.POST, this.create.bind(this), [new ValidateDtoMiddleware(CreateUserDto)]);
  }

  public async getUserByEmail(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, GetUserByEmailDto>,
    response: Response) {
    const foundUser = await this.userService.findByEmail(body.email);
    if (!foundUser) {
      response.statusMessage = `Conflict. User with email "${body.email}" not found.`;
      this.conflict(response);

      return;
    }
    const responseData = fillDTO(UserRdo, foundUser);

    this.ok(response, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    response: Response
  ){
    const isExists = await this.userService.findByEmail(body.email);

    if(isExists){
      response.statusMessage = 'Conflict. User with the same email is already exists.';
      this.conflict(response);

      return;
    }

    const createdUser = await this.userService.create(body, '');
    const responseData = fillDTO(UserRdo, createdUser);

    this.ok(response, responseData);
  }
}
