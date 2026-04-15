import { Module } from '@nestjs/common';
import { UnknownBugService } from './unknown-bug.service';
import { UnknownBugController } from './unknown-bug.controller';
import { UnknownBug } from './entities/unknown-bug.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([UnknownBug]),
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    })
  ],
  controllers: [UnknownBugController],
  providers: [UnknownBugService],
})
export class UnknownBugModule { }
