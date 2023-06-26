import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { EstateType } from '../../types/estate-type.enum.js';
import { UserEntity } from '../users/user.model.js';
import { Location } from '../../types/location.type.js';
import { DEFAULT_OFFER_COMMENT_QUANTITY, DEFAULT_OFFER_RATE } from './offer.constants.js';


export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps{
  @prop()
  public title!: string;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop()
  public description!: string;

  @prop()
  public city!: string;

  @prop()
  public previewImageSrc!: string;

  @prop()
  public offerImageSrc!: string[];

  @prop()
  public isPremium!: boolean;

  @prop({default: DEFAULT_OFFER_RATE})
  public rate!: number;

  @prop()
  public estateType!: EstateType;

  @prop()
  public roomsQuantity!: number;

  @prop()
  public guestQuantity!: number;

  @prop()
  public price!: number;

  @prop()
  public goods!: string[];

  @prop({default: DEFAULT_OFFER_COMMENT_QUANTITY})
  public commentsQuantity!: number;

  @prop()
  public location!: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
