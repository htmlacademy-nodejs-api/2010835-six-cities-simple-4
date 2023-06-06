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


async function bootstrap(){
  const DIContainer = new Container();

  DIContainer.bind<LoggerInterface>(ApplicationComponent.LoggerInterface).to(PinoLoggerService).inSingletonScope();
  DIContainer.bind<ConfigInterface>(ApplicationComponent.ConfigService).to(ConfigService).inSingletonScope();
  DIContainer.bind<RestApplication>(ApplicationComponent.RestApplication).to(RestApplication).inSingletonScope();
  DIContainer.bind<DatabaseInterface>(ApplicationComponent.DatabaseInterface).to(DatabaseService).inSingletonScope();
  DIContainer.bind<UserServiceInterface>(ApplicationComponent.UserDbInterface).to(UserService).inSingletonScope();
  DIContainer.bind<types.ModelType<UserEntity>>(ApplicationComponent.UserModel).toConstantValue(UserModel);

  const restApplication = DIContainer.get<RestApplication>(ApplicationComponent.RestApplication);
  await restApplication.init();
}

bootstrap();
