import { UserRang } from '../../../types/user-rang.enum.js';

export class UpdateUserDto{
  public name?: string;
  public avatar?: string;
  public passwor?: string;
  public userRang?: UserRang;
}
