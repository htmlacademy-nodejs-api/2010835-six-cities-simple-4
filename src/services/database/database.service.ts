import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { ApplicationComponent } from '../../types/application-component.type.js';
import { LoggerInterface } from '../../core/services/logger/logger.interface.js';
import { DatabaseInterface } from './database.interface.js';

@injectable()
export class DatabaseService implements DatabaseInterface {
  private isConnected: boolean;

  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface,
  ){
    this.isConnected = false;
  }

  public async connect(uri: string): Promise<void>{

    this.logger.info('Try to connect to MongoDB…');
    try {
      await mongoose.connect(uri);
    } catch (error) {
      this.logger.warn('Failed to connect to MongoDB on startup');
      await this.connect(uri);
    }
    this.isConnected = true;
    this.logger.info('Database connection established.');
  }

  public async disconnect(): Promise<void>{
    if(!this.isConnected){
      throw new Error('No active database connections.');
    }
    this.logger.info('Prepare to close MongoDB connection…');

    await mongoose.disconnect();
    this.isConnected = false;

    this.logger.info('Database connection closed.');
  }
}
