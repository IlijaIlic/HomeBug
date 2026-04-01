import { Module } from '@nestjs/common';
import { KnownBugService } from './known-bug.service';
import { KnownBugController } from './known-bug.controller';
import { KnownBug } from './entities/known-bug.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taxonomy } from 'src/taxonomy/entities/taxonomy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KnownBug]), TypeOrmModule.forFeature([Taxonomy])],
  controllers: [KnownBugController],
  providers: [KnownBugService],
})
export class KnownBugModule {}
