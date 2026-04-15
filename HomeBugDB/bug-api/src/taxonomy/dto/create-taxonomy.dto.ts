import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaxonomyDto {

    @IsString()
    @IsNotEmpty()
    taxonomyClass: string;

    @IsString()
    @IsNotEmpty()
    order: string;

    @IsString()
    @IsNotEmpty()
    family: string;

    @IsString()
    @IsNotEmpty()
    genus: string;

    @IsString()
    @IsNotEmpty()
    species: string;
}
