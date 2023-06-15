import { Expose } from 'class-transformer';
import { UserEntity } from '../../users/user.model.js';

export default class CreateCommentRdo {

  @Expose()
  public userId!: UserEntity;

  @Expose()
  public createdAt!: string;

  @Expose()
  public textContent!: string;

  @Expose()
  public rate!: number;
}
