import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.model.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DocumentExistsInterface } from '../../core/middleware/document-exists.interface.js';


export interface OfferServiceInterface extends DocumentExistsInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  patch(dto: UpdateOfferDto, offerId: string): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findMany(limit: number): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string, commentsToAddQuantity: number): Promise<DocumentType<OfferEntity> | null>;
  decCommentCount(offerId: string, commentsToDeleteQuantity: number): Promise<DocumentType<OfferEntity> | null>;
}
