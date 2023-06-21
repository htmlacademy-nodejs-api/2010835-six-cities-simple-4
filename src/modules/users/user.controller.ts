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
import { ValidateObjectIdMiddleware } from '../../core/middleware/validate-object-id.middleware.js';
import { UploadFileMiddleware } from '../../core/middleware/upload-file-manager.middleware.js';
import { ConfigService } from '../config/config.service.js';
import { DocumentExistsMiddleware } from '../../core/middleware/document-exists.middleware.js';
import { ParamsDictionary } from 'express-serve-static-core';

type ParamsUploadAvatar = {
  userId: string;
} | ParamsDictionary;

const DEFAULT_AVATAR = 'upload/default-avatar.jpeg';

@injectable()
export class UserController extends ControllerAbstract {

  constructor(
    @inject(ApplicationComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(ApplicationComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(ApplicationComponent.ConfigService) private readonly configService: ConfigService,
  ) {
    super();

    this.logger.info('Register routes for UserController…');

    this.addRoute('/index', HttpMethod.POST, this.getUserByEmail,
      [new ValidateDtoMiddleware(GetUserByEmailDto)]);
    this.addRoute('/', HttpMethod.POST, this.create,
      [new ValidateDtoMiddleware(CreateUserDto)]);
    this.addRoute('/:userId/avatar', HttpMethod.POST, this.uploadAvatar,
      [new ValidateObjectIdMiddleware('userId'), new DocumentExistsMiddleware(this.userService, 'User', 'userId'), new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar')]);
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

    const createdUser = await this.userService.create({ ...body, avatar: DEFAULT_AVATAR }, this.configService.get('SALT'));
    const responseData = fillDTO(UserRdo, createdUser);

    this.ok(response, responseData);
  }

  public async uploadAvatar(
    { params, file }: Request<ParamsUploadAvatar>,
    response: Response){
    const { userId } = params;

    if(!file){
      this.internalServerError(response);

      return;
    }

    this.userService.updateById(userId, {avatar: file.path});

    this.created(response, {
      filepath: file.path
    });
  }
}
