import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { GenresService } from './genres.service';
import { ErrorResponse } from '../interfaces/error';
import { Genre } from './models/genre.entity';
import { GenreSearchResponse, GenreSearchRequest } from '../interfaces/search';

@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

  @Get()
  async findAll(@Param() search: GenreSearchRequest): Promise<GenreSearchResponse> {
    return this.genresService.findAll(search);
  }

  @Post()
  @HttpCode(201) 
  async create(@Body() genre: Genre): Promise<Genre | ErrorResponse> {
    try {
        const createdGenre = await this.genresService.create(genre);
        return createdGenre;
    } catch (error) {
        return {
            message: error.message,
            statusCode: 500,
            error: 'Something went wrong'
        }
    }
  }

  @Put(':id')
  async update (@Param('id') id: number, @Body() genre: Genre): Promise<any> {
    const foundGenre = await this.genresService.findOne(id);

    if (!foundGenre) {
      throw new NotFoundException('Genre does not exist!');
    }
    await this.genresService.update(id, genre);
    return { message: 'Genre updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const genre = await this.genresService.findOne(id);

    if (!genre) {
      throw new NotFoundException('Genre does not exist!');
    }

    await this.genresService.delete(id);
    return { message: 'Genre deleted successfully' };
  }
}
