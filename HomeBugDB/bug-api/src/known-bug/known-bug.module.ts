import { Module } from '@nestjs/common';
import { KnownBugService } from './known-bug.service';
import { KnownBugController } from './known-bug.controller';

@Module({
  controllers: [KnownBugController],
  providers: [KnownBugService],
})
export class KnownBugModule {}
