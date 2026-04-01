import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionService {

  constructor(@InjectRepository(Region)
  private readonly regionRepo: Repository<Region>
  ) { }

  async create(createRegionDto: CreateRegionDto) {
    const reg = this.regionRepo.create({
      ...createRegionDto
    })

    return this.regionRepo.save(reg)
  }

  async findAll() {
    return this.regionRepo.find()
  }

  async findOne(id: number) {
    return this.regionRepo.find({
      where: { id }
    })
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    return `This action updates a #${id} region`;
  }

  async remove(id: number) {
    const reg = await this.findOne(id)

    if (reg) {
      return this.regionRepo.remove(reg);
    } else {
      return `Cannot find region with this id: #${id}`
    }
  }
}
