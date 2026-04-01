import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUnknownBugDto {

    @IsString()
    @IsNotEmpty()
    picture_url: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    size: string;

    @IsBoolean()
    wings: boolean;

    @IsNumber()
    @IsNotEmpty()
    legs: number;
}
