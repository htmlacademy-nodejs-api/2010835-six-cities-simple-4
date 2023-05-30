import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './app/rest-application.js';
import { PinoLoggerService } from './core/services/logger/pino-logger.service.js';
import { LoggerInterface } from './core/services/logger/logger.interface.js';
import { ApplicationComponent } from './types/application-component.type.js';
import { ConfigService } from './core/services/config/config.service.js';
import { ConfigInterface } from './core/services/config/config.interface.js';


async function bootstrap(){
  const DIContainer = new Container();

  DIContainer.bind<LoggerInterface>(ApplicationComponent.LoggerInterface).to(PinoLoggerService).inSingletonScope();
  DIContainer.bind<ConfigInterface>(ApplicationComponent.ConfigService).to(ConfigService).inSingletonScope();
  DIContainer.bind<RestApplication>(ApplicationComponent.RestApplication).to(RestApplication).inSingletonScope();

  const restApplication = DIContainer.get<RestApplication>(ApplicationComponent.RestApplication);
  await restApplication.init();
}

bootstrap();
