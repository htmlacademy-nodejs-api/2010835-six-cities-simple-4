import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.model.js';
import CreateCommentDto from './dto/create-comment.dto.js';

export interface CommentServiceInterface{
  index(offerId: string): Promise<DocumentType<CommentEntity>[]>
  create(comment: CreateCommentDto, offerId: string): Promise<DocumentType<CommentEntity>>;
  deleteByOfferId(offerId: string): Promise<number>;
  isAlreadyCommented(offerId: string, userId: string): Promise<boolean>;
}
