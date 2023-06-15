import { LoggerInterface } from './logger.interface';
import { injectable } from 'inversify';
import chalk from 'chalk';

@injectable()
export class CliLoggerService implements LoggerInterface {
  private logger;

  constructor(){
    this.logger = console;
  }

  public info(message: string): void{
    this.logger.info(`${chalk.bgGreen('INFO')} - ${chalk.cyan(new Date())} - ${message}`);
  }

  public warn(message: string): void{
    this.logger.info(`${chalk.bgYellow('WARN')} - ${chalk.cyan(new Date())} - ${message}`);
  }

  public error(message: string): void{
    this.logger.info(`${chalk.bgRedBright('ERROR')} - ${chalk.cyan(new Date())} - ${message}`);
  }

  public fatal(message: string): void{
    this.logger.info(`${chalk.bgRed('FATAL')} - ${chalk.cyan(new Date())} - ${message}`);
  }

  public debug(message: string): void{
    this.logger.info(`${chalk.bgBlueBright('DEBUG')} - ${chalk.cyan(new Date())} - ${message}`);
  }

  public trace(message: string): void{
    this.logger.info(`${chalk.bgCyanBright('TRACE')} - ${chalk.cyan(new Date())} - ${message}`);
  }
}
