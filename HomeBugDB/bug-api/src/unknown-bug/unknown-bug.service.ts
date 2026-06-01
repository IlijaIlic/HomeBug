import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnknownBugDto } from './dto/create-unknown-bug.dto';
import { UpdateUnknownBugDto } from './dto/update-unknown-bug.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnknownBug } from './entities/unknown-bug.entity';
import { MoreThan, Repository } from 'typeorm';
import { User } from '@user/entities/user.entity';
import { UnkFilterDto } from './dto/filter-unknown-bug.dto';
import { filter } from '@modules/rxjs/dist/types';

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
      user: user,
      dateCreated: createUnknownBugDto.dateCreated,
      found: false
    });

    user.unknown_scans.push(ubug);

    await this.userRepo.save(user);
    return this.unknownBugRepo.save(ubug);
  }

  async findAll(filters: UnkFilterDto = {}) {

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;
    const skip = (page - 1) * limit;

    const [insects, colors, sizes, countryCodes, total] = await Promise.all([
      (() => {
        const qb = this.unknownBugRepo
          .createQueryBuilder('unknown-bug')
          .leftJoinAndSelect('unknown-bug.user', 'user')
          .leftJoinAndSelect('unknown-bug.comments', 'comments')
          .leftJoinAndSelect('comments.user', 'comments_user')
          .leftJoinAndSelect('comments.ratings', 'ratings')
          .skip(skip)
          .take(limit);

        if (filters.colors?.length) {
          qb.andWhere('unknown-bug.color IN (:...colors)', { colors: filters.colors })
        }
        if (filters.sizes?.length) {
          qb.andWhere('unknown-bug.size IN (:...sizes)', { sizes: filters.sizes })
        }
        if (filters.countryCodes?.length) {
          qb.andWhere('unknown-bug.countryCode IN (:...countryCodes)', { countryCodes: filters.countryCodes })
        }
        if (filters.legs !== undefined) {
          qb.andWhere('unknown-bug.legs = :legs', { legs: filters.legs })
        }
        if (filters.wings !== undefined) {
          qb.andWhere('unknown-bug.wings = :wings', { wings: filters.wings });
        }
        return qb.getMany()
      })(),
      this.unknownBugRepo.createQueryBuilder('unknown-bug').select("DISTINCT unknown-bug.color", "color").getRawMany(),
      this.unknownBugRepo.createQueryBuilder('unknown-bug').select("DISTINCT unknown-bug.size", "size").getRawMany(),
      this.unknownBugRepo.createQueryBuilder('unknown-bug').select("DISTINCT unknown-bug.countryCode", "countryCode").getRawMany(),
      () => {
        const qb = this.unknownBugRepo.createQueryBuilder('unknown-bug');
        return qb.getCount()
      }
    ])
    return [insects, colors, sizes, countryCodes, total]
  }

  async findOne(id: number) {
    return this.unknownBugRepo.findOne({
      where: { id },
      relations: ['user', 'comments', 'comments.user', 'comments.ratings']
    })
  }

  async findFromTime(dateTime: Date) {
    return this.unknownBugRepo.find({
      where: {
        dateCreated: MoreThan(dateTime)
      },
      relations: ['user']
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

  async correct(ubugId: number, userId: number) {

    const ubug = await this.findOne(ubugId);
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['comments']
    })

    if (!ubug) throw new NotFoundException("UBug not found!");
    if (!user) throw new NotFoundException("User not found!");

    await this.userRepo.increment({ id: user.id }, 'reputation', +5)

    await this.unknownBugRepo.remove(ubug)
  }
}
