import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchema = {
  PORT: string;
  HOST: string;
  DB_PORT: string;
  DB_HOST: string;
  SALT: string;
  USER_NAME: string,
  PASSWORD: string,
  DB_NAME: string,
  UPLOAD_DIRECTORY: string,
}

export const configSchema = convict<ConfigSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: '4001',
  },
  HOST: {
    doc: 'IP address for incoming connections',
    format: 'ipaddress',
    env: 'HOST',
    default: '127.0.0.1',
  },
  DB_PORT: {
    doc: 'Port of the database server (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: '4002',
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: '03652853-ba24-4345-bd97-5e96380443d8',
  },
  USER_NAME: {
    doc: 'User name',
    format: String,
    env: 'USER_NAME',
    default: '',
  },
  PASSWORD: {
    doc: 'User password',
    format: String,
    env: 'PASSWORD',
    default: '',
  },
  DB_NAME: {
    doc: 'Database name',
    format: String,
    env: 'DB_NAME',
    default: '',
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for static files',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: '',
  }
});
