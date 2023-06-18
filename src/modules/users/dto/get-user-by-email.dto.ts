import { IsEmail } from 'class-validator';

export default class GetUserByEmailDto {
  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;
}
