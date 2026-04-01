import { Module } from '@nestjs/common';
import { UnknownBugService } from './unknown-bug.service';
import { UnknownBugController } from './unknown-bug.controller';
import { UnknownBug } from './entities/unknown-bug.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UnknownBug])],
  controllers: [UnknownBugController],
  providers: [UnknownBugService],
})
export class UnknownBugModule { }
