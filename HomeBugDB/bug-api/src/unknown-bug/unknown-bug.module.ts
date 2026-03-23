import { Module } from '@nestjs/common';
import { UnknownBugService } from './unknown-bug.service';
import { UnknownBugController } from './unknown-bug.controller';

@Module({
  controllers: [UnknownBugController],
  providers: [UnknownBugService],
})
export class UnknownBugModule {}
