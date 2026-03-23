import { Injectable } from '@nestjs/common';
import { CreateKnownBugDto } from './dto/create-known-bug.dto';
import { UpdateKnownBugDto } from './dto/update-known-bug.dto';

@Injectable()
export class KnownBugService {
  create(createKnownBugDto: CreateKnownBugDto) {
    return 'This action adds a new knownBug';
  }

  findAll() {
    return `This action returns all knownBug`;
  }

  findOne(id: number) {
    return `This action returns a #${id} knownBug`;
  }

  update(id: number, updateKnownBugDto: UpdateKnownBugDto) {
    return `This action updates a #${id} knownBug`;
  }

  remove(id: number) {
    return `This action removes a #${id} knownBug`;
  }
}
