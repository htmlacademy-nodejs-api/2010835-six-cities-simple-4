import { NextFunction, Request, Response } from 'express';
import { ControllerAbstract } from '../../core/controller/controller.abstract.js';
import { inject, injectable } from 'inversify';
import { ApplicationComponent } from '../../types/application-component.type.js';
import { HttpMethod } from '../../types/http-methods.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import OfferDetailRdo from './rdo/offer-detail.rdo.js';
import { fillDTO, fillDTOArray } from '../../utils/common.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import OfferRdo from './rdo/offer.rdo.js';
import OfferListRdo from './rdo/offer-list.rdo.js';
import { CommentServiceInterface } from '../comments/comment-service.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import HttpError from '../../core/errors/http-error.js';
import { ValidateObjectIdMiddleware } from '../../core/middleware/validate-object-id.middleware.js';
import { ValidateDtoMiddleware } from '../../core/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middleware/document-exists.middleware.js';

type ParamsOfferDetails = {
  offerId: string;
} | ParamsDictionary;

type ParamsOfferPatch = {
  offerId: string;
} | ParamsDictionary;

type QueryParamsOfferList = {
  limit: string;
} | Query;

@injectable()
export class OfferController extends ControllerAbstract {

  constructor(
    @inject(ApplicationComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(ApplicationComponent.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(ApplicationComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {
    super();

    this.logger.info('Register routes for OfferController…');

    this.addRoute('/', HttpMethod.GET, this.offerList);
    this.addRoute('/', HttpMethod.POST, this.create,
      [new ValidateDtoMiddleware(CreateOfferDto)]);
    this.addRoute('/:offerId', HttpMethod.PATCH, this.patch,
      [new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(UpdateOfferDto), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')],);
    this.addRoute('/:offerId', HttpMethod.GET, this.getDetailById,
      [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]);
    this.addRoute('/:offerId', HttpMethod.DELETE, this.delete,
      [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]);
  }

  async offerList(
    { query }: Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, QueryParamsOfferList>,
    response: Response
  ): Promise<void> {
    const limit = Number(query.limit);
    const foundOffers = await this.offerService.findMany(limit);
    const responseData = fillDTOArray(OfferListRdo, foundOffers);

    this.ok(response, responseData);
  }

  async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    response: Response
  ): Promise<void> {
    const createdOffer = await this.offerService.create(body);
    const foundOffer = await this.offerService.findById(createdOffer.id);
    const responseData = fillDTO(OfferRdo, foundOffer);

    this.created(response, responseData);
  }

  async patch(
    { body, params }: Request<ParamsOfferPatch, Record<string, unknown>, UpdateOfferDto>,
    response: Response
  ): Promise<void> {
    const { offerId } = params;
    const patchedOffer = await this.offerService.patch(body, offerId);
    if (patchedOffer === null) {
      throw new HttpError(
        401,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }
    const responseData = fillDTO(OfferRdo, patchedOffer);

    this.ok(response, responseData);
  }

  async delete(
    { params }: Request<ParamsOfferDetails>,
    response: Response): Promise<void> {
    const { offerId } = params;
    const deletedOffer = await this.offerService.deleteById(offerId);

    if (deletedOffer !== null) {
      await this.commentService.deleteByOfferId(deletedOffer._id.toString());
    }

    this.noContent(response);
  }

  async getDetailById({ params }: Request<ParamsOfferDetails>,response: Response, _next: NextFunction): Promise<void> {
    const { offerId } = params;
    const foundOffer = await this.offerService.findById(offerId);
    const responseData = fillDTO(OfferDetailRdo, foundOffer);

    this.ok(response, responseData);
  }

  async calculateOfferRating(offerId: string): Promise<number>{
    const foundComments = await this.commentService.index(offerId);

    if(foundComments.length === 0){
      return 0;
    }

    let rateSum = 0;

    foundComments.forEach((comment) => {
      rateSum += comment.rate;
    });

    const rate = rateSum / foundComments.length;

    return rate;
  }
}
