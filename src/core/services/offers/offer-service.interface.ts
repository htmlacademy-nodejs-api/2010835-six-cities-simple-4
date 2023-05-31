import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from '../../../dto/offer/create-offer.dto.js';
import { OfferEntity } from '../../models/offer/offer.model.js';


export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;

}
