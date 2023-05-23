import { CityName } from '../types/city-name.enum.js';
import { Location } from '../types/location.type';
import { MockDataSource } from '../types/mock-data-server-response.js';
import { getRandomLocation } from '../utils/location.js';
import { generateRandomValue, getRandomDate, getRandomItem, getRandomItems } from '../utils/random.js';
import { capitalizeFirstLetter } from '../utils/string-operations.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_ROOMS_QUANTITY = 1;
const MAX_ROOMS_QUANTITY = 8;
const MIN_GUESTS_QUANTITY = 1;
const MAX_GUESTS_QUANTITY = 10;
const MIN_RATE_VALUE = 1;
const MAX_RATE_VALUE = 5;
const MIN_COMMENTS_QUANTITY = 0;
const MAX_COMMENTS_QUANTITY = 100;
const RANDOM_DATE_LOWER_LIMIT_IN_DAYS = 5;
const LOCATION_RADIUS_LIMIT_IN_KILOMETERS = 5;

export default class MockOfferCreator{

  public static create(mockDataSource: MockDataSource): string{
    const from = new Date();
    const now = new Date();
    from.setDate(now.getDate() - RANDOM_DATE_LOWER_LIMIT_IN_DAYS);

    const title = getRandomItem(mockDataSource.titles);
    const description = getRandomItem(mockDataSource.description);
    const date = getRandomDate(from, now).toISOString();
    const city = getRandomItem(mockDataSource.city);
    const previewImageSrc = getRandomItem(mockDataSource.imageSrc);
    const offerImageSrc = getRandomItems(mockDataSource.imageSrc).join(';');
    const isPremium = generateRandomValue(0, 1) === 1;
    const isFavorite = generateRandomValue(0, 1) === 1;
    const rate = String(generateRandomValue(MIN_RATE_VALUE, MAX_RATE_VALUE, 1));
    const estateType = getRandomItem(mockDataSource.estateType);
    const roomsQuantity = String(generateRandomValue(MIN_ROOMS_QUANTITY, MAX_ROOMS_QUANTITY));
    const guestsQuantity = String(generateRandomValue(MIN_GUESTS_QUANTITY, MAX_GUESTS_QUANTITY));
    const price = String(generateRandomValue(MIN_PRICE, MAX_PRICE));
    const goods = getRandomItems(mockDataSource.goods).join(';');
    const hostEmail = getRandomItem(mockDataSource.hostEmail);
    const commentsQuantity = String(generateRandomValue(MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY));

    const cityLocation = this.generateLocation(city, LOCATION_RADIUS_LIMIT_IN_KILOMETERS);

    const location = `${cityLocation.latitude};${cityLocation.longitude}`;

    return [
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
      guestsQuantity,
      price,
      goods,
      hostEmail,
      commentsQuantity,
      location
    ].join('\t');
  }

  private static generateLocation(city : string, locationRadiusLimitInKilometers: number) : Location {
    city = capitalizeFirstLetter(city);

    return getRandomLocation(CityName[city as keyof typeof CityName], locationRadiusLimitInKilometers);
  }
}
