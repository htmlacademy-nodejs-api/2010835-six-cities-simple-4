export const ApplicationComponent = {
  RestApplication: Symbol.for('RestApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigService: Symbol.for('ConfigService'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserDbInterface: Symbol.for('UserDbInterface'),
  OfferDbInterface: Symbol.for('OfferDbInterface'),
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
} as const;
