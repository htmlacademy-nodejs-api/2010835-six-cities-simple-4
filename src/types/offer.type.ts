import { EstateType } from './estate-type.enum.js';
import { Location } from './location.type.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: string,
  previewImageSrc: string,
  offerImageSrc: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rate: number,
  estateType: EstateType,
  image: string;
  roomsQuantity: number,
  guestQuantity: number,
  price: number,
  goods: string[],
  hostEmail: string,
  commentsQuantity: number,
  location: Location,
}
