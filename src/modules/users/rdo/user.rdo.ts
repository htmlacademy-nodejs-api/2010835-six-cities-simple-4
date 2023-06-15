import { Expose } from 'class-transformer';
import { UserRang } from '../../../types/user-rang.enum.js';

export default class UserRdo {
  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public userRang!: UserRang;
}
