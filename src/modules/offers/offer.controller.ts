import { Request, Response } from 'express';
import { ControllerAbstract } from '../../core/controller/controller.abstract.js';
import { inject, injectable } from 'inversify';
import { ApplicationComponent } from '../../types/application-component.type.js';
import { HttpMethod } from '../../types/http-methods.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import OfferDetailRdo from './rdo/offer-detail.rdo.js';
import { fillDTO, fillDTOArray } from '../../utils/common.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import * as core from 'express-serve-static-core';
import OfferRdo from './rdo/offer.rdo.js';
import OfferListRdo from './rdo/offer-list.rdo.js';
import { CommentServiceInterface } from '../comments/comment-service.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';

type ParamsOfferDetails = {
  offerId: string;
}

@injectable()
export class OfferController extends ControllerAbstract {

  constructor(
    @inject(ApplicationComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(ApplicationComponent.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(ApplicationComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {
    super();

    this.logger.info('Register routes for OfferController…');

    this.addRoute('/', HttpMethod.GET, this.offerList.bind(this));
    this.addRoute('/', HttpMethod.POST, this.create.bind(this));
    this.addRoute('/:offerId', HttpMethod.PATCH, this.patch.bind(this));
    this.addRoute('/:offerId', HttpMethod.GET, this.getDetailById.bind(this));
  }

  async offerList(_request: Request, response: Response): Promise<void>{
    const foundOffers = await this.offerService.findMany(20);

    const responseData = fillDTOArray(OfferListRdo, foundOffers);

    this.ok(response, responseData);
  }

  async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    response: Response
  ): Promise<void>{
    const createdOffer = await this.offerService.create(body);
    const responseData = fillDTO(OfferRdo, createdOffer);

    this.created(response, responseData);
  }

  async patch(
    { body, params }: Request<core.ParamsDictionary | ParamsOfferDetails, Record<string, unknown>, UpdateOfferDto>,
    response: Response
  ): Promise<void>{
    const patchedOffer = await this.offerService.patch(body, params.offerId);
    const responseData = fillDTO(OfferRdo, patchedOffer);

    this.ok(response, responseData);
  }

  async delete(
    { params }: Request<core.ParamsDictionary | ParamsOfferDetails>,
    response: Response): Promise<void>{
    const deletedOffer = await this.offerService.deleteById(params.offerId);

    if(deletedOffer !== null){
      await this.commentService.deleteByOfferId(deletedOffer._id.toString());
    }

    this.ok(response, {});
  }

  async getDetailById(
    { params }: Request<core.ParamsDictionary | ParamsOfferDetails>,
    response: Response): Promise<void>{
    const foundOffer = await this.offerService.findById(params.offerId);

    if(!foundOffer){
      return this.notFound(response);
    }

    const responseData = fillDTO(OfferDetailRdo, foundOffer);

    this.ok(response, responseData);
  }
}
