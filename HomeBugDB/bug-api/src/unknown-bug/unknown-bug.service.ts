import { Injectable } from '@nestjs/common';
import { CreateUnknownBugDto } from './dto/create-unknown-bug.dto';
import { UpdateUnknownBugDto } from './dto/update-unknown-bug.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnknownBug } from './entities/unknown-bug.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnknownBugService {
  constructor(@InjectRepository(UnknownBug)
  private readonly unknownBugRepo: Repository<UnknownBug>
  ) { }

  async create(createUnknownBugDto: CreateUnknownBugDto, userID: number) {
    const ubug = this.unknownBugRepo.create({
      picture_url: createUnknownBugDto.picture_url,
      description: createUnknownBugDto.description,
      color: createUnknownBugDto.color,
      size: createUnknownBugDto.size,
      wings: createUnknownBugDto.wings,
      legs: createUnknownBugDto.legs,
      user: { id: userID }
    });
    return this.unknownBugRepo.save(ubug)
  }

  async findAll() {
    return this.unknownBugRepo.find({
      relations: ['user', 'comments']
    })
  }

  async findOne(id: number) {
    return this.unknownBugRepo.findOne({
      where: { id },
      relations: ['user', 'comments']
    })
  }

  async update(id: number, updateUnknownBugDto: UpdateUnknownBugDto) {
    return `This action updates a #${id} unknownBug`;
  }

  async remove(id: number) {
    const ubug = await this.findOne(id)
    if (ubug) {
      return this.unknownBugRepo.remove(ubug)
    } else {
      return `Unknown bug with this id #${id} no found!`;
    }
  }
}
