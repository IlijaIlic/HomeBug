import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUnknownBugDto {

    @IsString()
    @IsNotEmpty()
    picture_url: string;

    @IsString()
    description: string;

    @IsString()
    color: string;

    @IsString()
    size: string;

    @IsBoolean()
    wings: boolean;

    @IsNumber()
    legs: number;
}
