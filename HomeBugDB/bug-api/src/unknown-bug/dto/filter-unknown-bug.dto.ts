import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsBoolean, IsNumber, IsArray } from 'class-validator';

export class UnkFilterDto {

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page?: number = 1;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit?: number = 20;

    @IsOptional()
    @IsArray()
    @Transform(({ value }) => Array.isArray(value) ? value : [value])
    colors?: string[];

    @IsOptional()
    @IsArray()
    @Transform(({ value }) => Array.isArray(value) ? value : [value])
    sizes?: string[];

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value)
    wings?: boolean;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    legs?: number;

    @IsOptional()
    @IsArray()
    @Transform(({ value }) => Array.isArray(value) ? value : [value])
    countryCodes?: string[];
}