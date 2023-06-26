import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UserRang } from '../../../types/user-rang.enum.js';
import { MAXIMUM_USER_NAME_LENGTH, MAXIMUM_USER_PASSWORD_LENGTH, MINIMUM_USER_NAME_LENGTH, MINIMUM_USER_PASSWORD_LENGTH } from '../user.constants.js';

export class UpdateUserDto{
  @IsOptional()
  @IsString({message: 'Field name must be type of string'})
  @MinLength(MINIMUM_USER_NAME_LENGTH, {message: `Minimum name field length must be ${MINIMUM_USER_NAME_LENGTH}`})
  @MaxLength(MAXIMUM_USER_NAME_LENGTH, {message: `Maximum name field length must be ${MAXIMUM_USER_NAME_LENGTH}`})
  public name?: string;

  @IsOptional()
  public avatar?: string;

  @IsOptional()
  @IsString({message: 'Field password must be type of string'})
  @MinLength(MINIMUM_USER_PASSWORD_LENGTH, {message: `Minimum password field length must be ${MINIMUM_USER_PASSWORD_LENGTH}`})
  @MaxLength(MAXIMUM_USER_PASSWORD_LENGTH, {message: `Maximum password field length must be ${MAXIMUM_USER_PASSWORD_LENGTH}`})
  public password?: string;

  @IsOptional()
  @IsEnum(() => UserRang, {message: 'Field userRang must be one of the UserRang enum values'})
  public userRang?: UserRang;
}
