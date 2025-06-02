import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites, FavoritesResponse } from '@interfaces';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  findAll(): FavoritesResponse {
    return {
      artists: this.artistsService.getArtistsByIds(this.favorites.artists),
      albums: this.albumsService.getAlbumsByIds(this.favorites.albums),
      tracks: this.tracksService.getTracksByIds(this.favorites.tracks),
    };
  }

  addArtist(id: string): string {
    if (!this.artistsService.exists(id)) {
      throw new UnprocessableEntityException('Artist not found');
    }

    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }

    return 'Artist added to favorites';
  }

  removeArtist(id: string): void {
    const index = this.favorites.artists.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Artist is not in favorites');
    }
    this.favorites.artists.splice(index, 1);
  }

  addAlbum(id: string): string {
    if (!this.albumsService.exists(id)) {
      throw new UnprocessableEntityException('Album not found');
    }

    if (!this.favorites.albums.includes(id)) {
      this.favorites.albums.push(id);
    }

    return 'Album added to favorites';
  }

  removeAlbum(id: string): void {
    const index = this.favorites.albums.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Album is not in favorites');
    }
    this.favorites.albums.splice(index, 1);
  }

  addTrack(id: string): string {
    if (!this.tracksService.exists(id)) {
      throw new UnprocessableEntityException('Track not found');
    }

    if (!this.favorites.tracks.includes(id)) {
      this.favorites.tracks.push(id);
    }

    return 'Track added to favorites';
  }

  removeTrack(id: string): void {
    const index = this.favorites.tracks.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Track is not in favorites');
    }
    this.favorites.tracks.splice(index, 1);
  }

  removeArtistFromFavorites(artistId: string): void {
    const index = this.favorites.artists.indexOf(artistId);
    if (index !== -1) {
      this.favorites.artists.splice(index, 1);
    }
  }

  removeAlbumFromFavorites(albumId: string): void {
    const index = this.favorites.albums.indexOf(albumId);
    if (index !== -1) {
      this.favorites.albums.splice(index, 1);
    }
  }

  removeTrackFromFavorites(trackId: string): void {
    const index = this.favorites.tracks.indexOf(trackId);
    if (index !== -1) {
      this.favorites.tracks.splice(index, 1);
    }
  }
}
