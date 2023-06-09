import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User } from '../../types/user.type.js';
import { UserRang } from '../../types/user-rang.enum.js';
import { createSHA256 } from '../../utils/crypto.js';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps{
  @prop({ required: true })
  public name = '';

  @prop({ unique: true, required: true })
  public email = '';

  @prop({required: true, default: ''})
  private password?: string;

  @prop({ required: true, default: '' })
  public avatar = '';

  @prop({ type: () => String, enum: UserRang })
  public userRang = UserRang.DEFAULT;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.userRang = userData.userRang;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);

