import 'reflect-metadata';
import { getErrorMessage } from '../../utils/common.js';
import { parseMockData } from '../../utils/offers.js';
import { PinoLoggerService } from '../../modules/logger/pino-logger.service.js';
import { CliCommandInterface } from './cli-command.interface.js';
import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { getDbConnectionString } from '../../utils/database.js';
import { UserRang } from '../../types/user-rang.enum.js';
import { UserModel } from '../../modules/users/user.model.js';
import { OfferModel } from '../../modules/offers/offer.model.js';
import { MockDataObject } from '../../types/mock-data-object.type.js';
import CreateUserDto from '../../modules/users/dto/create-user.dto.js';
import CreateOfferDto from '../../modules/offers/dto/create-offer.dto.js';
import { OfferService } from '../../modules/offers/offer.service.js';
import { UserService } from '../../modules/users/user.service.js';
import { DatabaseService } from '../../modules/database/database.service.js';
import { CliCommandAbstract } from './cli-command.abstarct.js';

const DEFAULT_USER_PASSWORD = 'PASSWORD';
const DEFAULT_SALT = 'SALT';

export default class ImportCommand extends CliCommandAbstract implements CliCommandInterface {
  public readonly name;
  public logger;
  public database;
  public users;
  public offers;


  constructor() {
    super();
    this.name = '--import';
    this.logger = new PinoLoggerService();
    this.database = new DatabaseService(this.logger);
    this.users = new UserService(UserModel);
    this.offers = new OfferService(OfferModel);

    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);
  }

  private async saveDataToDatabase(mockData: MockDataObject) {
    const createdOrFindedUser = await this.users.findOrCreate({name: mockData.hostName, avatar: mockData.hostAvatar, email: mockData.hostEmail,
      userRang: UserRang.DEFAULT, password: DEFAULT_USER_PASSWORD} as CreateUserDto, DEFAULT_SALT);

    await this.offers.create({...mockData, userId: createdOrFindedUser._id.toString()} as CreateOfferDto);
  }

  public async onLine(line: string, resolve: () => void) {
    const parsedMockData = parseMockData(line);

    await this.saveDataToDatabase(parsedMockData);

    resolve();
  }

  private onComplete(count: number) {
    this.database.disconnect();
    this.logger.info(`${count} rows imported.`);
  }

  public async execute(filename: string, username: string, password: string, host: string, port: string, dbName: string): Promise<void> {
    await this.database.connect(getDbConnectionString(username, password, host, port, dbName));

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      this.logger.error(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
