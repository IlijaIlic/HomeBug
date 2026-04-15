import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { KnownBugService } from './known-bug.service';
import { CreateKnownBugDto } from './dto/create-known-bug.dto';
import { UpdateKnownBugDto } from './dto/update-known-bug.dto';
import { FilesInterceptor } from '@modules/@nestjs/platform-express';

@Controller('known-bug')
export class KnownBugController {
  constructor(private readonly knownBugService: KnownBugService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(@Body() body: any, @UploadedFiles() files: Express.Multer.File[]) {

    const parsedTaxonomy = JSON.parse(body.taxonomy);

    const pictureUrls = files.map(f => `uploads/${f.filename}`)
    const dto: CreateKnownBugDto = {
      common_name: body.common_name,
      latin_name: body.latin_name,
      picture_urls: pictureUrls,
      taxonomy: {
        taxonomyClass: parsedTaxonomy.taxonomyClass, // map correctly
        order: parsedTaxonomy.order,
        family: parsedTaxonomy.family,
        genus: parsedTaxonomy.genus,
        species: parsedTaxonomy.species,
      },
      overview: body.overview,
      regionsIds: JSON.parse(body.regionsIds),
      habitats: JSON.parse(body.habitats),
      behaviour: body.behaviour,
      body_type: body.body_type,
      color: body.color,
      diet: body.diet,
      no_legs: Number(body.no_legs),
      size: body.size,
      danger_to_humans: body.danger_to_humans === 'true',
      stings: body.stings === 'true',
      venomous: body.venomous === 'true',
      wings: body.wings === 'true',
      bites: body.bites === 'true',
    };

    return this.knownBugService.create(dto);
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
