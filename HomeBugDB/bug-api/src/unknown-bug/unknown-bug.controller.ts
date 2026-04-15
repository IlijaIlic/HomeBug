import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UnknownBugService } from './unknown-bug.service';
import { CreateUnknownBugDto } from './dto/create-unknown-bug.dto';
import { UpdateUnknownBugDto } from './dto/update-unknown-bug.dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer'

@Controller('unknown-bug')
@UseGuards(JwtAuthGuard)
export class UnknownBugController {
  constructor(private readonly unknownBugService: UnknownBugService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createUnknownBugDto: any, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
    const userID = req.user.id

    const filePath = `uploads/${file.filename}`
    const dto: CreateUnknownBugDto = {
      picture_url: filePath,
      description: createUnknownBugDto.description,
      color: createUnknownBugDto.color,
      size: createUnknownBugDto.size,
      wings: createUnknownBugDto.wings === 'true',   
      countryCode: createUnknownBugDto.countryCode,
      legs: Number(createUnknownBugDto.legs),       
    };

    return this.unknownBugService.create(dto, userID, file);
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
