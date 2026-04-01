import { Injectable } from '@nestjs/common';
import { CreateKnownBugDto } from './dto/create-known-bug.dto';
import { UpdateKnownBugDto } from './dto/update-known-bug.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KnownBug } from './entities/known-bug.entity';
import { Repository } from 'typeorm';
import { Taxonomy } from 'src/taxonomy/entities/taxonomy.entity';

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

  async findAll() {
    return this.knownBugRepo.find({
      relations: ['regions', 'taxonomy'],
    })
  }

  async findOne(id: number) {
    return this.knownBugRepo.find({
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
