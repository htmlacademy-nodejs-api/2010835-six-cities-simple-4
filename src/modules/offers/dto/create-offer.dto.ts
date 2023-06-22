import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsMongoId, IsObject, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { EstateType } from '../../../types/estate-type.enum.js';
import { Location } from '../../../types/location.type.js';
import { CityName } from '../../../types/city-name.enum.js';
import { Goods } from '../../../types/goods.enum.js';

export default class CreateOfferDto{
  @IsString()
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @IsString()
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsEnum(CityName, {message: 'Field city must be one of the CityName enum values'})
  public city!: CityName;

  @IsString({message: 'Field previewImageSrc is required'})
  public previewImageSrc!: string;

  @IsArray({message: 'Field offerImageSrc must be an array'})
  @ArrayMinSize(6, {message: 'Array field offerImageSrc must contain six elements'})
  @ArrayMaxSize(6, {message: 'Array field offerImageSrc must contain six elements'})
  public offerImageSrc!: string[];

  @IsBoolean({message: 'Field isPremium must be boolean'})
  public isPremium!: boolean;

  @IsEnum(EstateType, {message: 'Field estateType must be one of EstateType enum'})
  public estateType!: EstateType;

  @Min(1, {message: 'Minimum rooms quantity must be 1'})
  @Max(8, {message: 'Maximum rooms quantity must be 8'})
  public roomsQuantity!: number;

  @IsInt({message: 'Number of guest must be an integer'})
  @Min(1, {message: 'Minimum guest quantity must be 1'})
  @Max(10, {message: 'Maximum guest quantity must be 10'})
  public guestQuantity!: number;

  @IsInt({message: 'Price value must be an integer'})
  @Min(100, {message: 'Minimum price value must be 100'})
  @Max(100000, {message: 'Maximum price value must be 100000'})
  public price!: number;

  @IsArray({message: 'Field goods must be an array'})
  @IsEnum(Goods, {each: true, message: 'Array field goods elements must be one of Goods enum'})
  public goods!: string[];

  @IsMongoId({message: 'Field userId must be valid Mongo id'})
  public userId!: string;

  @IsObject()
  public location!: Location;
}
