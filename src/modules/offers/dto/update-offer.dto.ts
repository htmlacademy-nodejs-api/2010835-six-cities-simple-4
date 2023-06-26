import { CityName } from '../../../types/city-name.enum.js';
import { EstateType } from '../../../types/estate-type.enum.js';
import { Goods } from '../../../types/goods.enum.js';
import { Location } from '../../../types/location.type.js';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt,
  IsObject, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { MAXIMUM_OFFER_DESC_LENGTH, MAXIMUM_OFFER_GUEST_QUANTITY, MAXIMUM_OFFER_PRICE,
  MAXIMUM_OFFER_ROOM_QUANTITY, MAXIMUM_OFFER_TITLE_LENGTH, MINIMUM_OFFER_DESC_LENGTH,
  MINIMUM_OFFER_GUEST_QUANTITY, MINIMUM_OFFER_PRICE, MINIMUM_OFFER_ROOM_QUANTITY,
  MINIMUM_OFFER_TITLE_LENGTH, OFFER_PREVIEW_IMAGE_QUANTITY } from '../offer.constants.js';


export default class UpdateOfferDto{
  @IsOptional()
  @IsString()
  @MinLength(MINIMUM_OFFER_TITLE_LENGTH, {message: `Minimum title length must be ${MINIMUM_OFFER_TITLE_LENGTH}`})
  @MaxLength(MAXIMUM_OFFER_TITLE_LENGTH, {message: `Maximum title length must be ${MAXIMUM_OFFER_TITLE_LENGTH}`})
  public title?: string;

  @IsOptional()
  @IsString()
  @MinLength(MINIMUM_OFFER_DESC_LENGTH, {message: `Minimum description length must be ${MINIMUM_OFFER_DESC_LENGTH}`})
  @MaxLength(MAXIMUM_OFFER_DESC_LENGTH, {message: `Maximum description length must be ${MAXIMUM_OFFER_DESC_LENGTH}`})
  public description?: string;

  @IsOptional()
  @IsEnum(CityName, {message: 'Field city must be one of the CityName enum values'})
  public city?: string;

  @IsOptional()
  @IsString()
  @IsString({message: 'Field previewImageSrc is required'})
  public previewImageSrc?: string;


  @IsOptional()
  @IsArray({message: 'Field offerImageSrc must be an array'})
  @ArrayMinSize(OFFER_PREVIEW_IMAGE_QUANTITY, {message: `Array field offerImageSrc must contain ${OFFER_PREVIEW_IMAGE_QUANTITY} elements`})
  @ArrayMaxSize(OFFER_PREVIEW_IMAGE_QUANTITY, {message: `Array field offerImageSrc must contain ${OFFER_PREVIEW_IMAGE_QUANTITY} elements`})
  public offerImageSrc?: string[];

  @IsOptional()
  @IsBoolean({message: 'Field isPremium must be boolean'})
  public isPremium?: boolean;

  @IsOptional()
  public rate?: number;

  @IsOptional()
  @IsEnum(EstateType, {message: 'Field estateType must be one of EstateType enum'})
  public estateType?: EstateType;

  @IsOptional()
  @Min(MINIMUM_OFFER_ROOM_QUANTITY, {message: `Minimum rooms quantity must be ${MINIMUM_OFFER_ROOM_QUANTITY}`})
  @Max(MAXIMUM_OFFER_ROOM_QUANTITY, {message: `Maximum rooms quantity must be ${MAXIMUM_OFFER_ROOM_QUANTITY}`})
  public roomsQuantity?: number;

  @IsOptional()
  @IsInt({message: 'Number of guest must be an integer'})
  @Min(MINIMUM_OFFER_GUEST_QUANTITY, {message: `Minimum guest quantity must be ${MINIMUM_OFFER_GUEST_QUANTITY}`})
  @Max(MAXIMUM_OFFER_GUEST_QUANTITY, {message: `Maximum guest quantity must be ${MAXIMUM_OFFER_GUEST_QUANTITY}`})
  public guestQuantity?: number;

  @IsOptional()
  @IsInt({message: 'Price value must be an integer'})
  @Min(MINIMUM_OFFER_PRICE, {message: `Minimum price value must be ${MINIMUM_OFFER_PRICE}`})
  @Max(MAXIMUM_OFFER_PRICE, {message: `Maximum price value must be ${MAXIMUM_OFFER_PRICE}`})
  public price?: number;

  @IsOptional()
  @IsArray({message: 'Field goods must be an array'})
  @IsEnum(Goods, {each: true, message: 'Array field goods elements must be one of Goods enum'})
  public goods?: string[];

  @IsOptional()
  @IsObject()
  public location?: Location;
}
