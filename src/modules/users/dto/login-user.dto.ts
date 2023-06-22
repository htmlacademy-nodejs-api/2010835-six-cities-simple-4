import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export default class LoginUserDto {
  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @IsString({message: 'Field password must be type of string'})
  @MinLength(6, {message: 'Minimum password field length must be 6'})
  @MaxLength(12, {message: 'Maximum password field length must be 12'})
  public password!: string;
}
