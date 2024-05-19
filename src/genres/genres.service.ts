import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './models/genre.entity';
import { GenreSearchRequest, GenreSearchResponse } from '../interfaces/search';

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(Genre)
        private genreRepository: Repository<Genre>,
    ) {}
    
    async findAll(search: GenreSearchRequest): Promise<GenreSearchResponse> {
        const {take = 10, skip = 0} = search
        const [genres, count] = await this.genreRepository.findAndCount({
            take,
            skip,
        });
        return {genres, count};
    }
    
    async findOne(id: number): Promise<Genre> {
        return this.genreRepository.findOne({ where: { id } });
    }
    
    async create(genre: Partial<Genre>): Promise<Genre> {
        const newGenre = this.genreRepository.create(genre);
        return this.genreRepository.save(newGenre);
    }
    
    async update(id: number, genre: Partial<Genre>): Promise<Genre> {
        await this.genreRepository.update(id, genre);
        return this.genreRepository.findOne({ where: { id } });
    }
    
    async delete(id: number): Promise<void> {
        await this.genreRepository.delete(id);
    }

    async search(name:string): Promise<Genre> {
        return this.genreRepository.findOne({
            where: {
                name,
            }
        })
    }
}
