import { inject, injectable } from 'inversify';
import { ConfigInterface } from './config.interface.js';
import { ConfigSchema, configSchema } from './config.schema.js';
import { config } from 'dotenv';
import { LoggerInterface } from '../logger/logger.interface.js';
import { ApplicationComponent } from '../../types/application-component.type.js';


@injectable()
export class ConfigService implements ConfigInterface {
  private configSchema: ConfigSchema;

  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface,
  ){
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configSchema.load({});
    configSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.configSchema = configSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get(key: keyof ConfigSchema): ConfigSchema[keyof ConfigSchema]{
    return this.configSchema[key];
  }
}
