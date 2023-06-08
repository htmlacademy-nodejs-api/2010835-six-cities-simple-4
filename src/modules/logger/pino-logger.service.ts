import { pino } from 'pino';
import { LoggerInterface } from './logger.interface';
import { injectable } from 'inversify';

@injectable()
export class PinoLoggerService implements LoggerInterface {
  private logger;

  constructor(){
    this.logger = pino();
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
    this.logger.fatal(message);
  }

  public debug(message: string): void{
    this.logger.debug(message);
  }

  public trace(message: string): void{
    this.logger.trace(message);
  }
}
