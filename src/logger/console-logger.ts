import { Offer } from '../types/offer.type';
import chalk from 'chalk';
import { LoggerInterface } from './logger.interface';

export class ConsoleLogger implements LoggerInterface{
  dataToLog : Offer[];

  constructor(dataToLog : Offer[]){
    this.dataToLog = dataToLog;
  }

  public log(): void{
    this.dataToLog.forEach((data) => {
      console.log(`\n${chalk.bold.redBright('///*********************************///')}\n`);
      console.log(`Title: ${chalk.bold.cyan(data.title)}`);
      console.log(`Description: ${chalk.yellow(data.description)}`);
      console.log(`Date ${chalk.green(data.date)}`);
      console.log(`Preview image source: ${chalk.green(data.previewImageSrc)}`);
      console.log(`Offer image source: ${chalk.green(data.offerImageSrc.join(', '))}`);
      console.log(`Is premium: ${chalk.cyan(data.isPremium)}`);
      console.log(`Is favorite: ${chalk.cyan(data.isFavorite)}`);
      console.log(`Rate: ${chalk.green(data.rate)}`);
      console.log(`Estate type: ${chalk.green(data.estateType)}`);
      console.log(`Number of rooms: ${chalk.yellowBright(data.roomsQuantity)}`);
      console.log(`Number of guests: ${chalk.yellowBright(data.guestQuantity)}`);
      console.log(`Price: ${chalk.red(data.price)}`);
      console.log(`Goods: ${chalk.green(data.goods.join(', '))}`);
      console.log(`Host email: ${chalk.green(data.hostEmail)}`);
      console.log(`Number of comments: ${chalk.yellowBright(data.commentsQuantity)}`);
      console.log(`Location: latitude - ${chalk.yellow(data.location.latitude)}, longitude - ${chalk.yellow(data.location.longitude)}`);
      console.log('\n');
    });
  }
}
