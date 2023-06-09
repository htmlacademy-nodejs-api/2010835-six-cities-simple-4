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
import { DocumentExistsMiddleware } from '../../core/middleware/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../core/middleware/private-route.middleware.js';

type ParamsGetCommentsList = {
  offerId: string;
}

type ParamsOfferDetails = {
  offerId: string;
} | core.ParamsDictionary;

@injectable()
export default class CommentController extends ControllerAbstract {
  constructor(
    @inject(ApplicationComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(ApplicationComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(ApplicationComponent.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super();

    this.logger.info('Register routes for CommentController…');

    this.addRoute('/:offerId', HttpMethod.GET, this.getCommentsList,
      [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]);
    this.addRoute('/:offerId', HttpMethod.POST, this.create,
      [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateCommentDto), new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]);
  }

  public async getCommentsList(
    { params }: Request<core.ParamsDictionary | ParamsGetCommentsList, Record<string, unknown>, CreateCommentDto>,
    response: Response
  ): Promise<void> {

    const foundComments = await this.commentService.index(params.offerId);

    this.ok(response, foundComments);
  }

  public async create(
    { params, body, user }: Request<ParamsOfferDetails, Record<string, unknown>, CreateCommentDto>,
    response: Response
  ): Promise<void> {
    const { offerId } = params;
    const isAlreadyCommented = await this.commentService.isAlreadyCommented(offerId, user.id);

    if(isAlreadyCommented){
      throw new HttpError(
        409,
        `User with id ${user.id} has already rated offer with id ${offerId}.`,
        'CommentController'
      );
    }

    const createdComment = await this.commentService.create({...body, userId: user.id}, offerId);

    const updatedOffer = await this.offerService.incCommentCount(offerId, 1);

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
