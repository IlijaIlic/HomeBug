import { Injectable } from '@nestjs/common';
import { CreateTaxonomyDto } from './dto/create-taxonomy.dto';
import { UpdateTaxonomyDto } from './dto/update-taxonomy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Taxonomy } from './entities/taxonomy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaxonomyService {

  constructor(@InjectRepository(Taxonomy)
  private readonly taxonomyRepo: Repository<Taxonomy>
  ) { }

  async create(createTaxonomyDto: CreateTaxonomyDto) {
    const tax = this.taxonomyRepo.create({
      ...createTaxonomyDto
    })

    return this.taxonomyRepo.save(tax);
  }

  async findAll() {
    return this.taxonomyRepo.find();
  }

  async findOne(id: number) {
    return this.taxonomyRepo.find({
      where: { id }
    })
  }

  async update(id: number, updateTaxonomyDto: UpdateTaxonomyDto) {
    return `This action updates a #${id} taxonomy`;
  }

  async remove(id: number) {
    const tax = await this.findOne(id);

    if (tax) {
      return this.taxonomyRepo.remove(tax);
    } else {
      return `Cannot find taxonomy with this id:  #${id}`
    }
  }
}
