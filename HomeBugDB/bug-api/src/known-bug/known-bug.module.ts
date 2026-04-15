import { Module } from '@nestjs/common';
import { KnownBugService } from './known-bug.service';
import { KnownBugController } from './known-bug.controller';
import { KnownBug } from './entities/known-bug.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taxonomy } from '@taxonomy/entities/taxonomy.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';;

@Module({
  imports: [TypeOrmModule.forFeature([KnownBug]), TypeOrmModule.forFeature([Taxonomy]),
  MulterModule.register({
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  })],
  controllers: [KnownBugController],
  providers: [KnownBugService],
})
export class KnownBugModule { }
