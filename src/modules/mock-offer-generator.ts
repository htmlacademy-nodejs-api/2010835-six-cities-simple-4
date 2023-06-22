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
const RATE_DEFAULT_VALUE = 0;
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
    const rate = String(RATE_DEFAULT_VALUE);
    const estateType = getRandomItem(mockDataSource.estateType);
    const roomsQuantity = String(generateRandomValue(MIN_ROOMS_QUANTITY, MAX_ROOMS_QUANTITY));
    const guestsQuantity = String(generateRandomValue(MIN_GUESTS_QUANTITY, MAX_GUESTS_QUANTITY));
    const price = String(generateRandomValue(MIN_PRICE, MAX_PRICE));
    const goods = getRandomItems(mockDataSource.goods).join(';');
    const hostName = getRandomItem(mockDataSource.hostName);

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
      rate,
      estateType,
      roomsQuantity,
      guestsQuantity,
      price,
      goods,
      hostName,
      location
    ].join('\t');
  }

  private static generateLocation(city : string, locationRadiusLimitInKilometers: number) : Location {
    city = capitalizeFirstLetter(city);

    return getRandomLocation(CityName[city as keyof typeof CityName], locationRadiusLimitInKilometers);
  }
}
