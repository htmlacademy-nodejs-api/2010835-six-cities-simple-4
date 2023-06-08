import { inject, injectable } from 'inversify';
import { UserServiceInterface } from './user-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.model.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import CreateUserDto from './dto/create-user.dto.js';
import { ApplicationComponent } from '../../types/application-component.type.js';


@injectable()
export class UserService implements UserServiceInterface{

  constructor(
    @inject(ApplicationComponent.UserModel) private readonly userModel : types.ModelType<UserEntity>
  ){}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const newUser = new UserEntity(dto);
    newUser.setPassword(dto.password, salt);

    const createdUser = await this.userModel.create(newUser);

    return createdUser;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, {new: true})
      .exec();
  }

  public async deleteById(userId: string,): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndDelete(userId)
      .exec();
  }
}
