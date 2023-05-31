import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Offer } from '../../../types/offer.type.js';
import { EstateType } from '../../../types/estate-type.enum.js';
import { UserEntity } from '../user/user.model.js';


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
  public isFavorite!: boolean;

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
  public hostEmail!: string;

  @prop()
  public commentsQuantity!: number;

  @prop()
  public location!: string;

  constructor(offerData: Offer, userId: string) {
    super();

    this.title = offerData.title;
    this.userId = new Types.ObjectId(userId);
    this.description = offerData.description;
    this.city = offerData.city;
    this.previewImageSrc = offerData.previewImageSrc;
    this.offerImageSrc = offerData.offerImageSrc;
    this.isPremium = offerData.isPremium;
    this.isFavorite = offerData.isFavorite;
    this.rate = offerData.rate;
    this.estateType = offerData.estateType;
    this.roomsQuantity = offerData.roomsQuantity;
    this.guestQuantity = offerData.guestQuantity;
    this.price = offerData.price;
    this.goods = offerData.goods;
    this.hostEmail = offerData.hostEmail;
    this.commentsQuantity = offerData.commentsQuantity;
    this.location = `${offerData.location.latitude};${offerData.location.longitude}`;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
