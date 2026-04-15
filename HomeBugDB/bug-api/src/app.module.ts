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
import { ServeStaticModule } from '@modules/@nestjs/serve-static';
import { join } from 'path';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
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
    }), UserModule, KnownBugModule, UnknownBugModule, RegionModule, TaxonomyModule, CommentModule, AuthModule, RatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
