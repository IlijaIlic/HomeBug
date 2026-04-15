import { Injectable } from '@nestjs/common';
import { CreateUnknownBugDto } from './dto/create-unknown-bug.dto';
import { UpdateUnknownBugDto } from './dto/update-unknown-bug.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnknownBug } from './entities/unknown-bug.entity';
import { Repository } from 'typeorm';
import { User } from '@user/entities/user.entity';

@Injectable()
export class UnknownBugService {
  constructor(
    @InjectRepository(UnknownBug)
    private readonly unknownBugRepo: Repository<UnknownBug>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }

  async create(createUnknownBugDto: CreateUnknownBugDto, userID: number, file: Express.Multer.File) {
    const user = await this.userRepo.findOne({
      where: { id: userID },
      relations: ['unknown_scans']
    });

    if (!user) throw new Error('User not found');

    user.unknown_bugs_scanned += 1;
    user.reputation += 1;

    const ubug = this.unknownBugRepo.create({
      picture_url: createUnknownBugDto.picture_url,
      description: createUnknownBugDto.description,
      color: createUnknownBugDto.color,
      size: createUnknownBugDto.size,
      wings: createUnknownBugDto.wings,
      legs: createUnknownBugDto.legs,
      countryCode: createUnknownBugDto.countryCode,
      user: user
    });

    user.unknown_scans.push(ubug);

    await this.userRepo.save(user);
    return this.unknownBugRepo.save(ubug);
  }

  async findAll() {
    return this.unknownBugRepo.find({
      relations: ['user', 'comments', 'comments.user', 'comments.ratings']
    })
  }

  async findOne(id: number) {
    return this.unknownBugRepo.findOne({
      where: { id },
      relations: ['user', 'comments', 'comments.user', 'comments.ratings']
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
