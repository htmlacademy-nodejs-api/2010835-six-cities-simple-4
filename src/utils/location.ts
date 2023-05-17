import { AMSTERDAM_LATITUDE, AMSTERDAM_LONGITUDE, BRUSSELS_LATITUDE, BRUSSELS_LONGITUDE, COLOGNE_LATITUDE, COLOGNE_LONGITUDE,
  DUSSELDORF_LATITUDE, DUSSELDORF_LONGITUDE, HAMBURG_LATITUDE, HAMBURG_LONGITUDE, PARIS_LATITUDE, PARIS_LONGITUDE } from '../constants/constants.js';
import { CityName } from '../types/city-name.enum.js';
import { Location } from '../types/location.type.js';
import { generateRandomValue } from './random.js';

const AVERAGE_EARTH_RADIUS = 6371;
const PI = 3.14159;

export const getLocation = (cityName : CityName) : Location => {
  switch(cityName){
    case CityName.Amsterdam:
      return {latitude: AMSTERDAM_LATITUDE, longitude: AMSTERDAM_LONGITUDE};
    case CityName.Brussels:
      return {latitude: BRUSSELS_LATITUDE, longitude: BRUSSELS_LONGITUDE};
    case CityName.Cologne:
      return {latitude: COLOGNE_LATITUDE, longitude: COLOGNE_LONGITUDE};
    case CityName.Dusseldorf:
      return {latitude: DUSSELDORF_LATITUDE, longitude: DUSSELDORF_LONGITUDE};
    case CityName.Hamburg:
      return {latitude: HAMBURG_LATITUDE, longitude: HAMBURG_LONGITUDE};
    case CityName.Paris:
      return {latitude: PARIS_LATITUDE, longitude: PARIS_LONGITUDE};
  }
};

export const getRandomLocation = (cityName : CityName, locationRadiusLimitInKilometers: number) : Location => {
  const cityLocation = getLocation(cityName);

  const angleDelta = locationRadiusLimitInKilometers * 180 / (PI * AVERAGE_EARTH_RADIUS);

  const randomLatitude = generateRandomValue(cityLocation.latitude - angleDelta, cityLocation.latitude + angleDelta, 6);
  const randomLongitude = generateRandomValue(cityLocation.longitude - angleDelta, cityLocation.longitude + angleDelta, 6);


  return {latitude: randomLatitude, longitude: randomLongitude};
};
