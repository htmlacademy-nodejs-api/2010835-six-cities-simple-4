import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferServiceInterface } from './offer-service.interface.js';
import { ApplicationComponent } from '../../types/application-component.type.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.model.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

const DEFAULT_OFFER_LIMIT = 60;

@injectable()
export class OfferService implements OfferServiceInterface {

  constructor(
    @inject(ApplicationComponent.OfferModel) private readonly offerModel : types.ModelType<OfferEntity>,
  ){}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const createdOffer = await this.offerModel.create(dto);

    return createdOffer;
  }

  public async patch(dto: UpdateOfferDto, offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const patchedOffer = await this.offerModel.findByIdAndUpdate(offerId, dto, {new: true});
    return patchedOffer;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const deletedOffer = await this.offerModel.findByIdAndDelete(offerId);

    return deletedOffer;
  }

  public async findMany(limit: number = DEFAULT_OFFER_LIMIT): Promise<DocumentType<OfferEntity>[]> {
    const foundOffer = await this.offerModel.find().limit(limit).populate(['userId']);

    return foundOffer;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const foundOffer = await this.offerModel.findById(offerId).populate(['userId']);

    return foundOffer;
  }

  public async incCommentCount(offerId: string, commentsToAddQuantity: number): Promise<DocumentType<OfferEntity> | null>{
    const updatedOffer = await this.offerModel.findByIdAndUpdate(
      offerId,
      {'$inc': {
        commentsQuantity: commentsToAddQuantity,
      }},
      {new: true});

    return updatedOffer;
  }

  public async decCommentCount(offerId: string, commentsToDeleteQuantity: number): Promise<DocumentType<OfferEntity> | null>{
    const updatedOffer = await this.offerModel.findByIdAndUpdate(
      offerId,
      {'$dec': {
        commentsQuantity: commentsToDeleteQuantity,
      }},
      {new: true});

    return updatedOffer;
  }

  public async exists(documentId: string): Promise<boolean> {
    const foundOffer: DocumentType<OfferEntity> | null = await this.offerModel.findById(documentId);

    return foundOffer !== null;
  }
}
