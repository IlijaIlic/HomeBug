import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UnknownBugService } from './unknown-bug.service';
import { CreateUnknownBugDto } from './dto/create-unknown-bug.dto';
import { UpdateUnknownBugDto } from './dto/update-unknown-bug.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('unknown-bug')
@UseGuards(JwtAuthGuard)
export class UnknownBugController {
  constructor(private readonly unknownBugService: UnknownBugService) { }

  @Post()
  create(@Body() createUnknownBugDto: CreateUnknownBugDto, @Req() req:any) {
    const userID = req.user.id
    return this.unknownBugService.create(createUnknownBugDto, userID);
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
