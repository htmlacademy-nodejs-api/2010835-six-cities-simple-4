import { Expose } from 'class-transformer';
import { EstateType } from '../../../types/estate-type.enum.js';

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
  public rate!: number;

  @Expose()
  public commentsQuantity!: number;
}
