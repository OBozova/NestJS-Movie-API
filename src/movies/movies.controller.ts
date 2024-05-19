import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { Movie } from './models/movie.entity';
import { MoviesService } from './movies.service';
import { ErrorResponse } from '../interfaces/error';
import { MovieSearchRequest, MovieSearchResponse } from '../interfaces/search';
import { GenresService } from '../genres/genres.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService, private readonly genresService: GenresService) {}

  @Get()
  async findAll(@Query() search: MovieSearchRequest): Promise<MovieSearchResponse> {
    return this.moviesService.search(search);
  }

  @Post()
  @HttpCode(201) 
  async create(@Body() movie: Movie): Promise<Movie | ErrorResponse> {
    for (const genre of movie.genres) {
        const foundGenre = await this.genresService.search(genre.name)
        if(foundGenre) {
            genre.id = foundGenre.id
        } else {
            return {
                message: 'You are trying to add some genre that is not exist in the system yet. Please firstly add the genre',
                statusCode: 404,
                error: 'Genre Not Found!'
            }
        }
    }
    const createdMovie = await this.moviesService.create(movie);
    return createdMovie;
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Put(':id')
  async update (@Param('id') id: number, @Body() movie: Movie): Promise<any> {
    for (const genre of movie.genres) {
        const foundGenre = await this.genresService.search(genre.name)
        if(foundGenre) {
            genre.id = foundGenre.id
        } else {
            return {
                message: 'You are trying to add some genre that is not exist in the system yet. Please firstly add the genre',
                statusCode: 404,
                error: 'Genre Not Found!'
            }
        }
    }
    const foundMovie = await this.moviesService.findOne(id);

    if (!foundMovie) {
      throw new NotFoundException('Movie does not exist!');
    }
    await this.moviesService.update(id, movie);
    return { message: 'Movie updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const movie = await this.moviesService.findOne(id);

    if (!movie) {
      throw new NotFoundException('Movie does not exist!');
    }

    await this.moviesService.delete(id);
    return { message: 'Movie deleted successfully' };
  }
}
