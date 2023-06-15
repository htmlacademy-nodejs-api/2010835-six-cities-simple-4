import { Expose } from 'class-transformer';
import { EstateType } from '../../../types/estate-type.enum.js';
import { Location } from '../../../types/location.type.js';

export default class OfferDetailRdo{
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public city!: string;

  @Expose()
  public previewImageSrc!: string;

  @Expose()
  public offerImageSrc!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public estateType!: EstateType;

  @Expose()
  public roomsQuantity!: number;

  @Expose()
  public guestQuantity!: number;

  @Expose()
  public price!: number;

  @Expose()
  public goods!: string[];

  @Expose()
  public userId!: string;

  @Expose()
  public location!: Location;
}
