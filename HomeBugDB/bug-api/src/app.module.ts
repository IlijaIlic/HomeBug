import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { KnownBugModule } from './known-bug/known-bug.module';
import { UnknownBugModule } from './unknown-bug/unknown-bug.module';
import { RegionModule } from './region/region.module';
import { TaxonomyModule } from './taxonomy/taxonomy.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, KnownBugModule, UnknownBugModule, RegionModule, TaxonomyModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
