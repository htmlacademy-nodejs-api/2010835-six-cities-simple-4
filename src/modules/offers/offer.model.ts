import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { EstateType } from '../../types/estate-type.enum.js';
import { UserEntity } from '../users/user.model.js';
import { Location } from '../../types/location.type.js';
import CreateOfferDto from './dto/create-offer.dto.js';

const DEFAULT_COMMENTS_QUANTITY = 0;
const DEFAULT_RATE_VALUE = 0;

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps{
  public _id = new Types.ObjectId();

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

  @prop()
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

  @prop()
  public commentsQuantity!: number;

  @prop()
  public location!: Location;

  constructor(offerData: CreateOfferDto) {
    super();

    this.title = offerData.title;
    this.userId = new Types.ObjectId(offerData.userId);
    this.description = offerData.description;
    this.city = offerData.city;
    this.previewImageSrc = offerData.previewImageSrc;
    this.offerImageSrc = offerData.offerImageSrc;
    this.isPremium = offerData.isPremium;
    this.rate = DEFAULT_RATE_VALUE;
    this.estateType = offerData.estateType;
    this.roomsQuantity = offerData.roomsQuantity;
    this.guestQuantity = offerData.guestQuantity;
    this.price = offerData.price;
    this.goods = offerData.goods;
    this.commentsQuantity = DEFAULT_COMMENTS_QUANTITY;
    this.location = offerData.location;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
