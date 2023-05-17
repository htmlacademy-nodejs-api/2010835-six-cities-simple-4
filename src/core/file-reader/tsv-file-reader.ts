import { readFileSync } from 'node:fs';
import { EstateType } from '../../types/estate-type.enum.js';
import { FileReaderInterface } from './file-reader.interface.js';
import { Location } from '../../types/location.type.js';
import { Offer } from '../../types/offer.type.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, date, city, previewImageSrc, offerImageSrc, isPremium, isFavorite, rate, estateType, roomsQuantity, guestQuantity, price, goods, hostEmail, commentsQuantity, location]) => ({
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
        location: ({latitude: Number(location.split(';')[0]), longitude: Number(location.split(';')[1])} as Location)
      }));
  }
}
