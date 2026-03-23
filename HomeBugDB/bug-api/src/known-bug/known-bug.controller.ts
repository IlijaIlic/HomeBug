import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KnownBugService } from './known-bug.service';
import { CreateKnownBugDto } from './dto/create-known-bug.dto';
import { UpdateKnownBugDto } from './dto/update-known-bug.dto';

@Controller('known-bug')
export class KnownBugController {
  constructor(private readonly knownBugService: KnownBugService) {}

  @Post()
  create(@Body() createKnownBugDto: CreateKnownBugDto) {
    return this.knownBugService.create(createKnownBugDto);
  }

  @Get()
  findAll() {
    return this.knownBugService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.knownBugService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKnownBugDto: UpdateKnownBugDto) {
    return this.knownBugService.update(+id, updateKnownBugDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.knownBugService.remove(+id);
  }
}
