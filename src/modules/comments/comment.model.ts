import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { UserEntity } from '../users/user.model.js';
import { OfferEntity } from '../offers/offer.model.js';


@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps{
  public _id = new Types.ObjectId();

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

  @prop()
  public textContent!: string;

  @prop({
    require: true
  })
  public rate!: number;

  constructor(userId: string, offerId: string, textContent: string, rate: number){
    super();
    this.textContent = textContent;
    this.rate = rate;
    this.userId = new Types.ObjectId(userId);
    this.offerId = new Types.ObjectId(offerId);
  }
}

export const CommentModel = getModelForClass(CommentEntity);
