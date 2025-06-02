import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from '@dto/create-artist.dto';
import { UuidValidationPipe } from '@utils/uuid-validation.pipe';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', UuidValidationPipe) id: string) {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', UuidValidationPipe) id: string) {
    return this.artistsService.remove(id);
  }
}
