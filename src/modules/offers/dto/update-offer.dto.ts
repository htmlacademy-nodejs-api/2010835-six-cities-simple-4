import { EstateType } from '../../../types/estate-type.enum';
import { Location } from '../../../types/location.type';

export default class UpdateOfferDto{
  public title?: string;
  public description?: string;
  public city?: string;
  public previewImageSrc?: string;
  public offerImageSrc?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rate?: number;
  public estateType?: EstateType;
  public roomsQuantity?: number;
  public guestQuantity?: number;
  public price?: number;
  public goods?: string[];
  public hostEmail?: string;
  public location?: Location;
}
