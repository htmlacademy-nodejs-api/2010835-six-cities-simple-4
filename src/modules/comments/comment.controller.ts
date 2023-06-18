import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ApplicationComponent } from '../../types/application-component.type.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { ControllerAbstract } from '../../core/controller/controller.abstract.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { OfferServiceInterface } from '../offers/offer-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { HttpMethod } from '../../types/http-methods.enum.js';
import * as core from 'express-serve-static-core';
import CreateCommentRdo from './rdo/create-comment.rdo.js';
import { fillDTO } from '../../utils/common.js';
import { ValidateObjectIdMiddleware } from '../../core/middleware/validate-object-id.middleware.js';
import { ValidateDtoMiddleware } from '../../core/middleware/validate-dto.middleware.js';
import HttpError from '../../core/errors/http-error.js';

type ParamsGetCommentsList = {
  offerId: string;
}

@injectable()
export default class CommentController extends ControllerAbstract {
  constructor(
    @inject(ApplicationComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(ApplicationComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(ApplicationComponent.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super();

    this.logger.info('Register routes for CommentController…');

    this.addRoute('/:offerId', HttpMethod.GET, this.getCommentsList, [new ValidateObjectIdMiddleware('offerId')]);
    this.addRoute('/', HttpMethod.POST, this.create, [new ValidateDtoMiddleware(CreateCommentDto)]);
  }

  public async getCommentsList(
    { params }: Request<core.ParamsDictionary | ParamsGetCommentsList, Record<string, unknown>, CreateCommentDto>,
    response: Response
  ): Promise<void> {

    const foundComments = await this.commentService.index(params.offerId);

    this.ok(response, foundComments);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    response: Response
  ): Promise<void> {
    const { offerId, userId } = body;
    const isAlreadyCommented = await this.commentService.isAlreadyCommented(offerId, userId);

    if(isAlreadyCommented){
      throw new HttpError(
        409,
        `User with id ${userId} has already rated offer with id ${offerId}.`,
        'CommentController'
      );
    }

    const createdComment = await this.commentService.create(body);

    const updatedOffer = await this.offerService.incCommentCount(body.offerId, 1);

    if(updatedOffer){
      const rate = updatedOffer.rate + createdComment.rate;

      await this.offerService.patch({ rate: rate }, offerId);

    } else{
      throw new Error('Method call error. Comment controller -> create -> incCommentCount');
    }

    const responseData = fillDTO(CreateCommentRdo, createdComment);

    this.created(response, responseData);
  }
}
