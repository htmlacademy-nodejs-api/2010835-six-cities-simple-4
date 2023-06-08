import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.model.js';

export interface CommentsServiceInterface{
  index(offerId: number): Promise<DocumentType<CommentEntity>[]>
  create(comment: CommentEntity): Promise<DocumentType<CommentEntity>>;
  deleteByOfferId(offerId: string): Promise<number>;
}
