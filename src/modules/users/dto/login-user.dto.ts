import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { MAXIMUM_USER_PASSWORD_LENGTH, MINIMUM_USER_PASSWORD_LENGTH } from '../user.constants.js';

export default class LoginUserDto {
  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @IsString({message: 'Field password must be type of string'})
  @MinLength(MINIMUM_USER_PASSWORD_LENGTH, {message: `Minimum password field length must be ${MINIMUM_USER_PASSWORD_LENGTH}`})
  @MaxLength(MAXIMUM_USER_PASSWORD_LENGTH, {message: `Maximum password field length must be ${MAXIMUM_USER_PASSWORD_LENGTH}`})
  public password!: string;
}
