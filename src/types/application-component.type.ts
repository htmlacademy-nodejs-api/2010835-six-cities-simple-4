export const ApplicationComponent = {
  RestApplication: Symbol.for('RestApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigService: Symbol.for('ConfigService'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),

  HttpErrorExceptionFilter: Symbol.for('HttpErrorExceptionFilter'),
  BaseExceptionFilter: Symbol.for('BaseExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),

  UserServiceInterface: Symbol.for('UserServiceInterface'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  OfferServiceInterface: Symbol.for('OfferServiceInterface'),

  UserOfferRateServiceInterface: Symbol.for('UserOfferRateServiceInterface'),

  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  CommentModel: Symbol.for('CommentModel'),
  UserOfferRateModel: Symbol.for('UserOfferRateModel'),

  UserController: Symbol.for('UserController'),
  OfferController: Symbol.for('OfferController'),
  CommentController: Symbol.for('CommentController'),
} as const;
