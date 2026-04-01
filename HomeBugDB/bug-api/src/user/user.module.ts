import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { KnownBug } from 'src/known-bug/entities/known-bug.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([KnownBug])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]

})
export class UserModule { }
