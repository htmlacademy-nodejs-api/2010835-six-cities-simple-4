import { IsInt, IsMongoId, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export default class CreateCommentDto {
  public userId!: string;

  @IsMongoId({message: 'Field offerId must be valid Mongo id'})
  public offerId!: string;

  @IsString({message: 'Field testContent must be type of string'})
  @MinLength(5, {message: 'Minimum comment length must be 5'})
  @MaxLength(1024, {message: 'Maximum comment length must be 1024'})
  public textContent!: string;

  @IsInt({message: 'Field rate must be integer'})
  @Min(1, {message: 'Minimum rate value must be 1'})
  @Max(5, {message: 'Maximum rate value must be 5'})
  public rate!: number;
}
