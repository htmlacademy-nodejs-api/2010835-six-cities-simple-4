import { ConfigSchema } from './config.schema';

export interface ConfigInterface{
  get(key: keyof ConfigSchema): ConfigSchema[keyof ConfigSchema];
}
