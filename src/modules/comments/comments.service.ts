import { inject, injectable } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CommentsServiceInterface } from './comments-service.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { CommentEntity } from './comment.model.js';
import { ApplicationComponent } from '../../types/application-component.type.js';


@injectable()
export class CommentsService implements CommentsServiceInterface {

  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(ApplicationComponent.CommentModel) private readonly commentModel : types.ModelType<CommentEntity>,
  ){}

  public async create(comment: CommentEntity): Promise<types.DocumentType<CommentEntity>> {
    const createdComment = await this.commentModel.create(comment);

    this.logger.info(`Comment with id - ${createdComment._id} was created.`);

    return createdComment;
  }

}
