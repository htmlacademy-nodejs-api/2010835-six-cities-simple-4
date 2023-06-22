import { EstateType } from './estate-type.enum.js';
import { Location } from './location.type.js';

export type MockDataObject = {
  title: string;
  description: string;
  date: Date;
  city: string,
  previewImageSrc: string,
  offerImageSrc: string[],
  isPremium: boolean,
  rate: number,
  estateType: EstateType,
  roomsQuantity: number,
  guestQuantity: number,
  price: number,
  goods: string[],
  hostEmail: string,
  hostName: string,
  hostAvatar: string,
  location: Location,
}
