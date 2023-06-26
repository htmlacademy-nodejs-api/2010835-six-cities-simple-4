import { IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { MAXIMUM_COMMENT_LENGTH, MAXIMUM_COMMENT_RATE, MINIMUM_COMMENT_LENGTH, MINIMUM_COMMENT_RATE } from '../comment.constants.js';

export default class CreateCommentDto {
  public userId!: string;

  @IsString({message: 'Field testContent must be type of string'})
  @MinLength(MINIMUM_COMMENT_LENGTH, {message: `Minimum comment length must be ${MINIMUM_COMMENT_LENGTH}`})
  @MaxLength(MAXIMUM_COMMENT_LENGTH, {message: `Maximum comment length must be ${MAXIMUM_COMMENT_LENGTH}`})
  public textContent!: string;

  @IsInt({message: 'Field rate must be integer'})
  @Min(MINIMUM_COMMENT_RATE, {message: `Minimum rate value must be ${MINIMUM_COMMENT_RATE}`})
  @Max(MAXIMUM_COMMENT_RATE, {message: `Maximum rate value must be ${MAXIMUM_COMMENT_RATE}`})
  public rate!: number;
}
