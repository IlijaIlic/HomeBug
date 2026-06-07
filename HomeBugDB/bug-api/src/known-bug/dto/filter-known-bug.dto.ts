import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsBoolean, IsNumber, IsArray } from 'class-validator';

export class KnownFilterDto {

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  common_name?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  colors?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  bodyTypes?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  habitats?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  sizes?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  diets?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  behaviours?: string[];

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value)
  dangerous?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value)
  wings?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value)
  venomous?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value)
  bites?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value)
  stings?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  legs?: number;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  regions?: string[];

  @IsOptional()
  excludeId?: number
}