import cors from 'cors';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../modules/logger/logger.interface.js';
import { ApplicationComponent } from '../types/application-component.type.js';
import { ConfigService } from '../modules/config/config.service.js';
import express, { Express } from 'express';
import { DatabaseInterface } from '../modules/database/database.interface.js';
import { getDbConnectionString } from '../utils/database.js';
import { ControllerInterface } from '../core/controller/controller.interface.js';
import { ExceptionFilterInterface } from '../core/exception-filters/exception-filter.interface.js';
import { AuthenticateMiddleware } from '../core/middleware/authentication.middleware.js';

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
    @inject(ApplicationComponent.HttpErrorExceptionFilter) private readonly httpErrorExceptionFilter: ExceptionFilterInterface,
    @inject(ApplicationComponent.BaseExceptionFilter) private readonly baseExceptionFilter: ExceptionFilterInterface,
    @inject(ApplicationComponent.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilterInterface,
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
    const host = this.config.get('DB_HOST');
    const port = this.config.get('DB_PORT');
    const username = this.config.get('USER_NAME');
    const password = this.config.get('PASSWORD');
    const dbName = this.config.get('DB_NAME');

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
    this.expressApplication.use('/upload', express.static(this.config.get('UPLOAD_DIRECTORY')));
    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApplication.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.expressApplication.use(cors());
    this.logger.info('Middleware initialization complete successfuly.');
  }

  private async initExceptionFilter(): Promise<void>{
    this.logger.info('Exception filters initialization');
    this.expressApplication.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.expressApplication.use(this.httpErrorExceptionFilter.catch.bind(this.httpErrorExceptionFilter));
    this.expressApplication.use(this.baseExceptionFilter.catch.bind(this.baseExceptionFilter));
    this.logger.info('Exception filters completed');
  }
}
