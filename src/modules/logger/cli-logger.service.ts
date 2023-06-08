import { LoggerInterface } from './logger.interface';
import { injectable } from 'inversify';

@injectable()
export class CliLoggerService implements LoggerInterface {
  private logger;

  constructor(){
    this.logger = console;
  }

  public info(message: string): void{
    this.logger.info(message);
  }

  public warn(message: string): void{
    this.logger.warn(message);
  }

  public error(message: string): void{
    this.logger.error(message);
  }

  public fatal(message: string): void{
    this.logger.error(message);
  }

  public debug(message: string): void{
    this.logger.debug(message);
  }

  public trace(message: string): void{
    this.logger.trace(message);
  }
}
