import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { UserRang } from '../../../types/user-rang.enum.js';

export default class CreateUserDto {
  @IsString({message: 'Field name must be type of string'})
  @MinLength(1, {message: 'Minimum name field length must be 1'})
  @MaxLength(15, {message: 'Maximum name field length must be 15'})
  public name!: string;

  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  public avatar!: string;

  @IsEnum(() => UserRang, {message: 'Field userRang must be one of the UserRang enum values'})
  public userRang!: UserRang;

  @IsString({message: 'Field password must be type of string'})
  @MinLength(6, {message: 'Minimum password field length must be 6'})
  @MaxLength(12, {message: 'Maximum password field length must be 12'})
  public password!: string;
}
