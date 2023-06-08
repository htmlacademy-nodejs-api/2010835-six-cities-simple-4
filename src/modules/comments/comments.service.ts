import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentsServiceInterface } from './comments-service.interface.js';
import { CommentEntity } from './comment.model.js';
import { ApplicationComponent } from '../../types/application-component.type.js';


@injectable()
export class CommentsService implements CommentsServiceInterface {

  constructor(
    @inject(ApplicationComponent.CommentModel) private readonly commentModel : types.ModelType<CommentEntity>,
  ){}

  public async index(offerId: number): Promise<DocumentType<CommentEntity>[]>{
    const foundComments = await this.commentModel.find({offerId});

    return foundComments;
  }

  public async create(comment: CommentEntity): Promise<DocumentType<CommentEntity>> {
    const createdComment = await this.commentModel.create(comment);

    return createdComment;
  }

  public async deleteByOfferId(offerId: string): Promise<number>{
    const deletedCount = (await this.commentModel.deleteMany({offerId})).deletedCount;

    return deletedCount;
  }
}
