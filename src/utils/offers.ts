import { EstateType } from '../types/estate-type.enum.js';
import { Location } from '../types/location.type.js';
import { MockDataObject } from '../types/mock-data-object.type.js';

export function parseMockData(offerData: string): MockDataObject {
  const [
    title,
    description,
    date,
    city,
    previewImageSrc,
    offerImageSrc,
    isPremium,
    rate,
    estateType,
    roomsQuantity,
    guestQuantity,
    price,
    goods,
    hostName,
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
    rate: Number(rate),
    estateType: EstateType[(estateType as keyof typeof EstateType)],
    roomsQuantity: Number(roomsQuantity),
    guestQuantity: Number(guestQuantity),
    price: Number(price),
    goods: goods.split(';'),
    hostName,
    hostEmail: `${hostName.toLowerCase().replace(' ', '-')}@fakemail.com`,
    hostAvatar: `${hostName.toLowerCase().replace(' ', '-')}.png`,
    location: {longitude: parseFloat(longitude), latitude: parseFloat(latitude)} as Location,
  };
}
