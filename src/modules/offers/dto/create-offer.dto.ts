import { EstateType } from '../../../types/estate-type.enum';
import { Location } from '../../../types/location.type';

export default class CreateOfferDto{
  public title!: string;
  public description!: string;
  public city!: string;
  public previewImageSrc!: string;
  public offerImageSrc!: string[];
  public isPremium!: boolean;
  public estateType!: EstateType;
  public roomsQuantity!: number;
  public guestQuantity!: number;
  public price!: number;
  public goods!: string[];
  public userId!: string;
  public location!: Location;
}
