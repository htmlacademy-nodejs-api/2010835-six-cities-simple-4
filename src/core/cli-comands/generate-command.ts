
import axios, { AxiosResponse } from 'axios';
import { CliCommandInterface } from './cli-command.interface.js';
import { MockDataSource } from '../../types/mock-data-server-response.js';
import MockOfferCreator from '../../modules/mock-offer-generator.js';
import { appendFile } from 'node:fs/promises';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name;
  private mockDataSource!: MockDataSource;

  constructor(){
    this.name = '--generate';
  }

  public async execute(...parameters: string[]): Promise<void>{
    const [quantity, filepath, url] = parameters;
    const offerQuantity = Number.parseInt(quantity, 10);

    await this.requestMockDataSource(url);

    for (let i = 0; i < offerQuantity; i++) {
      await appendFile(filepath, `${MockOfferCreator.create(this.mockDataSource)}\n`, 'utf8');
    }

    console.log(`File ${filepath} was created!`);
  }

  private async requestMockDataSource(url: string): Promise<void>{
    try {
      const response: AxiosResponse<MockDataSource> = await axios.get(url);
      this.mockDataSource = response.data;
    } catch (error) {
      console.error(error);
    }
  }

}
