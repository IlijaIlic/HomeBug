import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnownBugModule } from './known-bug/known-bug.module';
import { UnknownBugModule } from './unknown-bug/unknown-bug.module';
import { RegionModule } from './region/region.module';
import { TaxonomyModule } from './taxonomy/taxonomy.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'buguser',
      password: 'bugpass',
      database: 'bugdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }), UserModule, KnownBugModule, UnknownBugModule, RegionModule, TaxonomyModule, CommentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
