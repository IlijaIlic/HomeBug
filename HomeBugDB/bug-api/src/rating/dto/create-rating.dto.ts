import { IsEnum, IsInt } from 'class-validator';

export class CreateRatingDto {
    @IsInt()
    userId: number;

    @IsInt()
    commentId: number;

    @IsEnum(['+', '-'])
    rate: '+' | '-'
}