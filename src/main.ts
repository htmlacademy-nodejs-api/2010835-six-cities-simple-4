import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './app/rest-application.js';
import { PinoLoggerService } from './modules/logger/pino-logger.service.js';
import { LoggerInterface } from './modules/logger/logger.interface.js';
import { ApplicationComponent } from './types/application-component.type.js';
import { UserEntity, UserModel } from './modules/users/user.model.js';
import { types } from '@typegoose/typegoose';
import { UserServiceInterface } from './modules/users/user-service.interface.js';
import { DatabaseService } from './modules/database/database.service.js';
import { DatabaseInterface } from './modules/database/database.interface.js';
import { UserService } from './modules/users/user.service.js';
import { ConfigInterface } from './modules/config/config.interface.js';
import { ConfigService } from './modules/config/config.service.js';
import { ControllerInterface } from './core/controller/controller.interface.js';
import { UserController } from './modules/users/user.controller.js';
import { OfferController } from './modules/offers/offer.controller.js';
import { OfferServiceInterface } from './modules/offers/offer-service.interface.js';
import { OfferService } from './modules/offers/offer.service.js';
import { OfferEntity, OfferModel } from './modules/offers/offer.model.js';
import { CommentServiceInterface } from './modules/comments/comment-service.interface.js';
import { CommentService } from './modules/comments/comment.service.js';
import CommentController from './modules/comments/comment.controller.js';
import { CommentEntity, CommentModel } from './modules/comments/comment.model.js';
import { ExceptionFilterInterface } from './core/exception-filters/exception-filter.interface.js';
import BaseExceptionFilter from './core/exception-filters/base-exception-filter.js';
import ValidationExceptionFilter from './core/exception-filters/validation-exception-filter.js';
import HttpErrorExceptionFilter from './core/exception-filters/http-error-exception-filter.js';


async function bootstrap(){
  const DIContainer = new Container();

  DIContainer.bind<LoggerInterface>(ApplicationComponent.LoggerInterface).to(PinoLoggerService).inSingletonScope();
  DIContainer.bind<ConfigInterface>(ApplicationComponent.ConfigService).to(ConfigService).inSingletonScope();
  DIContainer.bind<RestApplication>(ApplicationComponent.RestApplication).to(RestApplication).inSingletonScope();
  DIContainer.bind<DatabaseInterface>(ApplicationComponent.DatabaseInterface).to(DatabaseService).inSingletonScope();
  DIContainer.bind<UserServiceInterface>(ApplicationComponent.UserServiceInterface).to(UserService).inSingletonScope();
  DIContainer.bind<OfferServiceInterface>(ApplicationComponent.OfferServiceInterface).to(OfferService).inSingletonScope();
  DIContainer.bind<CommentServiceInterface>(ApplicationComponent.CommentServiceInterface).to(CommentService).inSingletonScope();

  DIContainer.bind<ExceptionFilterInterface>(ApplicationComponent.HttpErrorExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  DIContainer.bind<ExceptionFilterInterface>(ApplicationComponent.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  DIContainer.bind<ExceptionFilterInterface>(ApplicationComponent.BaseExceptionFilter).to(BaseExceptionFilter).inSingletonScope();


  DIContainer.bind<types.ModelType<UserEntity>>(ApplicationComponent.UserModel).toConstantValue(UserModel);
  DIContainer.bind<types.ModelType<OfferEntity>>(ApplicationComponent.OfferModel).toConstantValue(OfferModel);
  DIContainer.bind<types.ModelType<CommentEntity>>(ApplicationComponent.CommentModel).toConstantValue(CommentModel);


  DIContainer.bind<ControllerInterface>(ApplicationComponent.UserController).to(UserController).inSingletonScope();
  DIContainer.bind<ControllerInterface>(ApplicationComponent.OfferController).to(OfferController).inSingletonScope();
  DIContainer.bind<ControllerInterface>(ApplicationComponent.CommentController).to(CommentController).inSingletonScope();


  const restApplication = DIContainer.get<RestApplication>(ApplicationComponent.RestApplication);
  await restApplication.init();
}

bootstrap();
