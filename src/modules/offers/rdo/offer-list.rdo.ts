import { Expose, Transform } from 'class-transformer';
import { EstateType } from '../../../types/estate-type.enum.js';
import { roundToFixed } from '../../../utils/random.js';


export default class OfferListRdo{
  @Expose()
  public title!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImageSrc!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public estateType!: EstateType;

  @Expose()
  public price!: number;

  @Expose()
  @Transform(({ value, obj }) => roundToFixed(value / obj.commentsQuantity, 1))
  public rate!: number;

  @Expose()
  public commentsQuantity!: number;
}


