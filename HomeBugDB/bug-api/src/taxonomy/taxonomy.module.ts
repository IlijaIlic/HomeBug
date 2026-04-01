import { Module } from '@nestjs/common';
import { TaxonomyService } from './taxonomy.service';
import { TaxonomyController } from './taxonomy.controller';
import { Taxonomy } from './entities/taxonomy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Taxonomy])],
  controllers: [TaxonomyController],
  providers: [TaxonomyService],
})
export class TaxonomyModule { }
