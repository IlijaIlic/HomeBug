import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnknownBugService } from './unknown-bug.service';
import { CreateUnknownBugDto } from './dto/create-unknown-bug.dto';
import { UpdateUnknownBugDto } from './dto/update-unknown-bug.dto';

@Controller('unknown-bug')
export class UnknownBugController {
  constructor(private readonly unknownBugService: UnknownBugService) {}

  @Post()
  create(@Body() createUnknownBugDto: CreateUnknownBugDto) {
    return this.unknownBugService.create(createUnknownBugDto);
  }

  @Get()
  findAll() {
    return this.unknownBugService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unknownBugService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnknownBugDto: UpdateUnknownBugDto) {
    return this.unknownBugService.update(+id, updateUnknownBugDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unknownBugService.remove(+id);
  }
}
