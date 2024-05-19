import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './models/movie.entity';
import { Genre } from '../genres/models/genre.entity';
import { GenresService } from '../genres/genres.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre])],
  controllers: [MoviesController],
  providers: [MoviesService, GenresService]
})
export class MoviesModule {}
