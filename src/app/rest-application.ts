import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../core/services/logger/logger.interface';
import { ApplicationComponent } from '../types/application-component.type.js';
import { ConfigService } from '../core/services/config/config.service.js';

@injectable()
export class RestApplication {

  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(ApplicationComponent.ConfigService) private readonly config: ConfigService,
  ) {}

  public async init(){
    this.logger.info('Application has been initialized');
    this.logger.info(`
      The application uses the following environment variables:
        DB_HOST: ${this.config.get('DB_HOST')}
        PORT: ${this.config.get('PORT')}
        SALT: ${this.config.get('SALT')}
    `);
  }
}
