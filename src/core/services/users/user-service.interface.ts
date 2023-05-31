import { DocumentType } from '@typegoose/typegoose';
import CreateUserDto from '../../../dto/user/create-user.dto.js';
import { UserEntity } from '../../models/user/user.model.js';

export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
}
