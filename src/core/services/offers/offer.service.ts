import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from '../../models/offer/offer.model.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import CreateOfferDto from '../../../dto/offer/create-offer.dto.js';
import { ApplicationComponent } from '../../../types/application-component.type.js';
import { OfferServiceInterface } from './offer-service.interface.js';

@injectable()
export class OfferService implements OfferServiceInterface {

  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(ApplicationComponent.OfferModel) private readonly offerModel : types.ModelType<OfferEntity>,
  ){}


  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const newOffer = new OfferEntity(dto, dto.userId);
    const createdOffer = await this.offerModel.create(newOffer);

    this.logger.info(`Offer with id - ${createdOffer._id} was created.`);

    return createdOffer;
  }
}
