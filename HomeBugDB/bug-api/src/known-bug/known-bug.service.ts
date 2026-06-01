import { Injectable } from '@nestjs/common';
import { CreateKnownBugDto } from './dto/create-known-bug.dto';
import { UpdateKnownBugDto } from './dto/update-known-bug.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KnownBug } from './entities/known-bug.entity';
import { Repository } from 'typeorm';
import { Taxonomy } from '@taxonomy/entities/taxonomy.entity';
import { KnownFilterDto } from './dto/filter-known-bug.dto';

@Injectable()
export class KnownBugService {
  constructor(
    @InjectRepository(KnownBug)
    private readonly knownBugRepo: Repository<KnownBug>,
    @InjectRepository(Taxonomy)
    private readonly taxRepo: Repository<Taxonomy>
  ) { }

  async create(createKnownBugDto: CreateKnownBugDto) {

    const tax = this.taxRepo.create({
      ...createKnownBugDto.taxonomy
    })

    const savedTax = await this.taxRepo.save(tax);

    const kbug = this.knownBugRepo.create({
      common_name: createKnownBugDto.common_name,
      latin_name: createKnownBugDto.latin_name,
      picture_urls: createKnownBugDto.picture_urls,
      habitats: createKnownBugDto.habitats,
      no_legs: createKnownBugDto.no_legs,
      body_type: createKnownBugDto.body_type,
      color: createKnownBugDto.color,
      size: createKnownBugDto.size,
      wings: createKnownBugDto.wings,
      diet: createKnownBugDto.diet,
      danger_to_humans: createKnownBugDto.danger_to_humans,
      behaviour: createKnownBugDto.behaviour,
      venomous: createKnownBugDto.venomous,
      bites: createKnownBugDto.bites,
      stings: createKnownBugDto.stings,
      overview: createKnownBugDto.overview,
      regions: createKnownBugDto.regionsIds.map(id => ({ id })),
      taxonomy: { id: savedTax.id }
    })
    return this.knownBugRepo.save(kbug);
  }

  async findFiltered(filters: KnownFilterDto = {}) {

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;
    const skip = (page - 1) * limit;

    const qb = this.knownBugRepo
      .createQueryBuilder('known-bug')
      .leftJoinAndSelect('known-bug.regions', 'regions')
      .leftJoinAndSelect('known-bug.taxonomy', 'taxonomy')
      .skip(skip)
      .take(limit);

    if (filters.common_name) {
      qb.andWhere('known-bug.common_name ILIKE :common_name', { common_name: `%${filters.common_name}%` });
    }
    if (filters.regions?.length) {
      qb.andWhere('regions.name IN (:...regions)', { regions: filters.regions });
    }
    if (filters.colors?.length) {
      qb.andWhere('known-bug.color IN (:...colors)', { colors: filters.colors });
    }
    if (filters.bodyTypes?.length) {
      qb.andWhere('known-bug.body_type IN (:...bodyTypes)', { bodyTypes: filters.bodyTypes });
    }
    if (filters.habitats?.length) {
      qb.andWhere('"known-bug".habitats && ARRAY[:...habitats]', { habitats: filters.habitats });
    }
    if (filters.sizes?.length) {
      qb.andWhere('known-bug.size IN (:...sizes)', { sizes: filters.sizes });
    }
    if (filters.diets?.length) {
      qb.andWhere('known-bug.diet IN (:...diets)', { diets: filters.diets });
    }
    if (filters.behaviours?.length) {
      qb.andWhere('known-bug.behaviour IN (:...behaviours)', { behaviours: filters.behaviours });
    }
    if (filters.dangerous !== undefined) {
      qb.andWhere('known-bug.danger_to_humans = :dangerous', { dangerous: filters.dangerous });
    }
    if (filters.wings !== undefined) {
      qb.andWhere('known-bug.wings = :wings', { wings: filters.wings });
    }
    if (filters.venomous !== undefined) {
      qb.andWhere('known-bug.venomous = :venomous', { venomous: filters.venomous });
    }
    if (filters.bites !== undefined) {
      qb.andWhere('known-bug.bites = :bites', { bites: filters.bites });
    }
    if (filters.stings !== undefined) {
      qb.andWhere('known-bug.stings = :stings', { stings: filters.stings });
    }
    if (filters.legs !== undefined) {
      qb.andWhere('known-bug.no_legs = :legs', { legs: filters.legs });
    }

    const [[insects, total], colors, bodyTypes, habitats, sizes, diets, behaviours, regions] = await Promise.all([
      qb.getManyAndCount(),
      this.knownBugRepo
        .createQueryBuilder('known-bug')
        .select("DISTINCT known-bug.color", "color")
        .getRawMany(),
      this.knownBugRepo
        .createQueryBuilder('known-bug')
        .select("DISTINCT known-bug.body_type", "body_type")
        .getRawMany(),
      this.knownBugRepo
        .createQueryBuilder('known-bug')
        .select("DISTINCT known-bug.habitats", "habitats")
        .getRawMany(),
      this.knownBugRepo
        .createQueryBuilder('known-bug')
        .select("DISTINCT known-bug.size", "size")
        .getRawMany(),
      this.knownBugRepo
        .createQueryBuilder('known-bug')
        .select("DISTINCT known-bug.diet", "diet")
        .getRawMany(),
      this.knownBugRepo
        .createQueryBuilder('known-bug')
        .select("DISTINCT known-bug.behaviour", "behaviour")
        .getRawMany(),
      this.knownBugRepo
        .createQueryBuilder('known-bug')
        .innerJoin('known-bug.regions', 'region')
        .select('region.id', 'id')
        .addSelect('region.name', 'name')
        .distinct(true)
        .getRawMany(),
      (() => {
        const qb = this.knownBugRepo.createQueryBuilder('known-bug');
        return qb.getCount()
      })()
    ])
    return [insects, colors, bodyTypes, habitats, sizes, diets, behaviours, regions, total];
  }

  async findAll() {
    const qb = this.knownBugRepo
      .createQueryBuilder('known-bug')
      .leftJoinAndSelect('known-bug.regions', 'regions')
      .leftJoinAndSelect('known-bug.taxonomy', 'taxonomy')

    return qb.getMany();
  }

  async findOne(id: number) {
    return this.knownBugRepo.findOne({
      relations: ['regions', 'taxonomy'],
      where: { id }
    });
  }

  async update(id: number, updateKnownBugDto: UpdateKnownBugDto) {
    return `This action updates a #${id} knownBug`;
  }

  async remove(id: number) {
    const kbug = await this.findOne(id);
    if (kbug) {
      return this.knownBugRepo.remove(kbug)
    } else {
      return `No known bug found with this id:  #${id}`;
    }
  }
}
