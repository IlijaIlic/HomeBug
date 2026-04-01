import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UnknownBug } from 'src/unknown-bug/entities/unknown-bug.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), TypeOrmModule.forFeature([UnknownBug])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule { }
