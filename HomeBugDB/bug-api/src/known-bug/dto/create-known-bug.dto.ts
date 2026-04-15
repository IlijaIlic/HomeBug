import { Type } from "class-transformer";
import { isArray, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateTaxonomyDto } from "@taxonomy/dto/create-taxonomy.dto";

export class CreateKnownBugDto {

    @IsString()
    @IsNotEmpty()
    common_name: string;

    @IsString()
    @IsNotEmpty()
    latin_name: string;

    @IsArray()
    picture_urls: string[];

    @IsArray()
    habitats: string[];

    @IsNumber()
    no_legs: number;

    @IsString()
    body_type: string;

    @IsString()
    color: string;

    @IsString()
    size: string;

    @IsBoolean()
    wings: boolean;

    @IsString()
    diet: string;

    @IsBoolean()
    danger_to_humans: boolean;

    @IsString()
    behaviour: string;

    @IsBoolean()
    venomous: boolean;

    @IsBoolean()
    bites: boolean;

    @IsBoolean()
    stings: boolean;

    @IsString()
    overview: string;

    @ValidateNested()
    @Type(() => CreateTaxonomyDto)
    taxonomy?: CreateTaxonomyDto;

    @IsArray()
    @IsNumber({}, { each: true })
    @IsNotEmpty()
    regionsIds: number[];

}
