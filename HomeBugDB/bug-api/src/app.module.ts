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
import { APP_GUARD } from '@modules/@nestjs/core';
import { RolesGuard } from '@auth/roles.guard';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT!) || 5432,
      username: process.env.DATABASE_USER || 'buguser',
      password: process.env.DATABASE_PASSWORD || 'bugpass',
      database: process.env.DATABASE_NAME || 'bugdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    KnownBugModule,
    UnknownBugModule,
    RegionModule,
    TaxonomyModule,
    CommentModule,
    AuthModule,
    RatingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
