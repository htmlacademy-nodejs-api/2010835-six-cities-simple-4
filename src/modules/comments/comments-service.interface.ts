import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.model.js';

export interface CommentsServiceInterface{
  create(comment: CommentEntity): Promise<DocumentType<CommentEntity>> ;
}
