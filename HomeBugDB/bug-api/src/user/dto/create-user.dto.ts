import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8, {message: "Password should be at least 8 characters long!"})
    password: string;

    @IsString()
    @IsEnum(Gender, {message: "Gender must be either male or female."})
    gender: string;
}
