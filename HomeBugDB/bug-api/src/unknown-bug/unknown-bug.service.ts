import { Injectable } from '@nestjs/common';
import { CreateUnknownBugDto } from './dto/create-unknown-bug.dto';
import { UpdateUnknownBugDto } from './dto/update-unknown-bug.dto';

@Injectable()
export class UnknownBugService {
  create(createUnknownBugDto: CreateUnknownBugDto) {
    return 'This action adds a new unknownBug';
  }

  findAll() {
    return `This action returns all unknownBug`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unknownBug`;
  }

  update(id: number, updateUnknownBugDto: UpdateUnknownBugDto) {
    return `This action updates a #${id} unknownBug`;
  }

  remove(id: number) {
    return `This action removes a #${id} unknownBug`;
  }
}
