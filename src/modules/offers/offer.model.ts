import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { EstateType } from '../../types/estate-type.enum.js';
import { UserEntity } from '../users/user.model.js';
import { Location } from '../../types/location.type.js';


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

  @prop({default: 0})
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

  @prop({default: 0})
  public commentsQuantity!: number;

  @prop()
  public location!: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
