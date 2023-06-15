
import axios, { AxiosResponse } from 'axios';
import { CliCommandInterface } from './cli-command.interface.js';
import { MockDataSource } from '../../types/mock-data-server-response.js';
import MockOfferCreator from '../../modules/mock-offer-generator.js';
import TSVFileWriter from '../file-writer/tsv-file-writer.js';
import { CliCommandAbstract } from './cli-command.abstarct.js';

export default class GenerateCommand extends CliCommandAbstract implements CliCommandInterface {
  public readonly name;
  private mockDataSource!: MockDataSource;

  constructor(){
    super();
    this.name = '--generate';
  }

  public async execute(...parameters: string[]): Promise<void>{
    const [quantity, filepath, url] = parameters;
    const offerQuantity = Number.parseInt(quantity, 10);

    await this.requestMockDataSource(url);

    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerQuantity; i++) {
      await tsvFileWriter.write(`${MockOfferCreator.create(this.mockDataSource)}`);
    }

    this.logger.info(`File ${filepath} was created!`);
  }

  private async requestMockDataSource(url: string): Promise<void>{
    try {
      const response: AxiosResponse<MockDataSource> = await axios.get(url);
      this.mockDataSource = response.data;
    } catch (error) {
      this.logger.error((error as Error).message);
    }
  }

}
