import { Expose, Type } from 'class-transformer';
import UserRdo from '../../users/rdo/user.rdo.js';

export default class CreateCommentRdo {

  @Expose({name: 'userId'})
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose()
  public createdAt!: string;

  @Expose()
  public textContent!: string;

  @Expose()
  public rate!: number;
}
