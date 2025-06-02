import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UuidValidationPipe } from '@utils/uuid-validation.pipe';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id', UuidValidationPipe) id: string) {
    return { message: this.favoritesService.addArtist(id) };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', UuidValidationPipe) id: string) {
    return this.favoritesService.removeArtist(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id', UuidValidationPipe) id: string) {
    return { message: this.favoritesService.addAlbum(id) };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', UuidValidationPipe) id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id', UuidValidationPipe) id: string) {
    return { message: this.favoritesService.addTrack(id) };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', UuidValidationPipe) id: string) {
    return this.favoritesService.removeTrack(id);
  }
}
