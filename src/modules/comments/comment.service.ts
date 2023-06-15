import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentServiceInterface } from './comment-service.interface.js';
import { CommentEntity } from './comment.model.js';
import { ApplicationComponent } from '../../types/application-component.type.js';
import CreateCommentDto from './dto/create-comment.dto.js';


@injectable()
export class CommentService implements CommentServiceInterface {

  constructor(
    @inject(ApplicationComponent.CommentModel) private readonly commentModel : types.ModelType<CommentEntity>,
  ){}

  public async index(offerId: string): Promise<DocumentType<CommentEntity>[]>{
    const foundComments = await this.commentModel.find({offerId});

    return foundComments;
  }

  public async create(comment: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const createdComment = (await this.commentModel.create(comment)).populate(['userId']);

    return createdComment;
  }

  public async deleteByOfferId(offerId: string): Promise<number>{
    const deletedCount = (await this.commentModel.deleteMany({offerId})).deletedCount;

    return deletedCount;
  }

  public async isAlreadyCommented(offerId: string, userId: string): Promise<boolean>{
    const foundComment = await this.commentModel.find({offerId, userId});

    if(foundComment.length === 0){
      return false;
    } else{
      return true;
    }
  }
}
