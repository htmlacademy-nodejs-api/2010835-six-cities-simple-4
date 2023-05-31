export const getDbConnectionString = (username: string, password: string, dbHost: string, port: string, dbName: string): string =>
  `mongodb://${username}:${password}@${dbHost}:${port}/${dbName}?authSource=admin`;
