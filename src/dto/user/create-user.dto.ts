import { UserRang } from '../../types/user-rang.enum';

export default class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatar!: string;
  public userRang!: UserRang;
  public password!: string;
}
