import { EstateType } from '../../types/estate-type.enum.js';
import { Location } from '../../types/location.type';
import { Offer } from '../../types/offer.type';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    date,
    city,
    previewImageSrc,
    offerImageSrc,
    isPremium,
    isFavorite,
    rate,
    estateType,
    roomsQuantity,
    guestQuantity,
    price,
    goods,
    hostEmail,
    commentsQuantity,
    location
  ] = offerData.replace('\n', '').split('\t');

  const [longitude, latitude] = location.split(';');

  return {
    title,
    description,
    date: new Date(date),
    city,
    previewImageSrc,
    offerImageSrc: offerImageSrc.split(';'),
    isPremium: isPremium.toLowerCase() === 'true',
    isFavorite: isFavorite.toLowerCase() === 'true',
    rate: Number(rate),
    estateType: EstateType[(estateType as keyof typeof EstateType)],
    roomsQuantity: Number(roomsQuantity),
    guestQuantity: Number(guestQuantity),
    price: Number(price),
    goods: goods.split(';'),
    hostEmail,
    commentsQuantity: Number(commentsQuantity),
    location: {longitude: parseFloat(longitude), latitude: parseFloat(latitude)} as Location,
  };
}
