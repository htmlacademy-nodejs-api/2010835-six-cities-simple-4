import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../modules/logger/logger.interface.js';
import { ApplicationComponent } from '../types/application-component.type.js';
import { ConfigService } from '../modules/config/config.service.js';
import express, { Express } from 'express';
import { DatabaseInterface } from '../modules/database/database.interface.js';
import { getDbConnectionString } from '../utils/database.js';
import { ControllerInterface } from '../core/controller/controller.interface.js';
import { ExceptionFilterInterface } from '../core/exception-filters/exception-filter.interface.js';

@injectable()
export class RestApplication {
  private expressApplication: Express;

  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(ApplicationComponent.ConfigService) private readonly config: ConfigService,
    @inject(ApplicationComponent.DatabaseInterface) private readonly databaseClient: DatabaseInterface,
    @inject(ApplicationComponent.UserController) private readonly userController: ControllerInterface,
    @inject(ApplicationComponent.OfferController) private readonly offerController: ControllerInterface,
    @inject(ApplicationComponent.CommentController) private readonly commentController: ControllerInterface,
    @inject(ApplicationComponent.ExceptionFilterInterface) private readonly exceptionFilter: ExceptionFilterInterface
  ) {
    this.expressApplication = express();
  }

  public async init(){
    await this.initDatabase();
    await this.initMiddleware();
    await this.initRoutes();
    await this.initExceptionFilter();
    await this.initServer();

    this.logger.info('Application has been initialized');
  }

  private async initServer() {
    this.logger.info('Try to init server…');

    const port = this.config.get('PORT');
    const host = this.config.get('HOST');
    this.expressApplication.listen(port);


    this.logger.info(`🚀Server started on http://${host}:${port}`);
  }

  private async initDatabase(){
    const host = this.config.get('DB_HOST') as string;
    const port = this.config.get('DB_PORT') as string;
    const username = this.config.get('USER_NAME') as string;
    const password = this.config.get('PASSWORD') as string;
    const dbName = this.config.get('DB_NAME') as string;

    const databaseConnectionString = getDbConnectionString(username, password, host, port, dbName);

    this.logger.info(`Try to init database connection. Database connection string - <${databaseConnectionString}>`);

    await this.databaseClient.connect(databaseConnectionString);
  }

  private async initRoutes(): Promise<void>{
    this.expressApplication.use('/users', this.userController.getRouter());
    this.expressApplication.use('/offers', this.offerController.getRouter());
    this.expressApplication.use('/comments', this.commentController.getRouter());
  }

  private async initMiddleware(): Promise<void>{
    this.logger.info('Try to init middleware...');
    this.expressApplication.use(express.json());
    this.logger.info('Middleware initialization complete successfuly.');
  }

  private async initExceptionFilter(): Promise<void>{
    this.logger.info('Exception filters initialization');
    this.expressApplication.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    this.logger.info('Exception filters completed');
  }
}
