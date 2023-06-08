import { CliLoggerService } from '../../modules/logger/cli-logger.service.js';
import { LoggerInterface } from '../../modules/logger/logger.interface.js';

export abstract class CliCommandAbstract{
  protected logger: LoggerInterface;

  constructor(){
    this.logger = new CliLoggerService();
  }
}
