import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { UserEntity } from '../users/user.model';
import { OfferEntity } from '../offers/offer.model';

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps{
  public _id = new Types.ObjectId();

  @prop()
  public textContent!: string;

  @prop()
  public rate!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId!: Ref<UserEntity>;

  constructor(textContent: string, rate: number, userId: string, offerId: string){
    super();
    this.textContent = textContent;
    this.rate = rate;
    this.userId = new Types.ObjectId(userId);
    this.offerId = new Types.ObjectId(offerId);
  }
}

export const OfferModel = getModelForClass(CommentEntity);
