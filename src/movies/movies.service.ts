import { Injectable } from '@nestjs/common';
import { Movie } from './models/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MovieSearchRequest, MovieSearchResponse } from 'src/interfaces/search';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
    ) {}
    
    async findOne(id: number): Promise<Movie> {
        return this.movieRepository.findOne({
            where: { id },
            relations: {
                genres: true,
            }
        });
    }
    
    async create(movie: Partial<Movie>): Promise<Movie> {
        const newMovie = this.movieRepository.create(movie);
        return this.movieRepository.save(newMovie);
    }
    
    async update(id: number, movie: Partial<Movie>): Promise<Movie> {
        await this.movieRepository.update(id, movie);
        return this.movieRepository.findOne({ where: { id } });
    }
    
    async delete(id: number): Promise<void> {
        await this.movieRepository.delete(id);
    }

    async search(search: MovieSearchRequest): Promise<MovieSearchResponse> {
        const {genre, title, take = 10, skip = 0} = search
        if (genre) {
            const [movies, count] = await this.movieRepository.findAndCount({
                relations: {
                    genres: true,
                },
                where: {
                    genres: {
                        name: genre,
                    }
                },
                take,
                skip,
            })
            return {movies,count}
        }
        if (title) {
            const [movies, count] = await this.movieRepository.findAndCount({
                relations: {
                    genres: true,
                },
                where: {
                    title: Like(`%${title}%`)
                },
                take,
                skip,
            });
            return {movies,count}
        }

        const [movies, count] = await this.movieRepository.findAndCount({
            relations: {
                genres: true,
            },
            take,
            skip,
        });

        return {movies,count}
    }
}
