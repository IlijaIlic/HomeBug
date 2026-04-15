import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@modules/@nestjs/typeorm';
import { Comment } from '@comment/entities/comment.entity';
import { User } from '@user/entities/user.entity';
import { Rating } from './entities/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([Rating]),],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule { }
