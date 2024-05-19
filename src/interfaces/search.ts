import { Genre } from "../genres/models/genre.entity";
import { Movie } from "../movies/models/movie.entity";

export interface MovieSearchRequest {
    title?: string;
    genre?: string;
    take?: number;
    skip?: number;
}

export interface MovieSearchResponse {
    movies: Movie[];
    count: number;
}

export interface GenreSearchRequest {
    take?: number;
    skip?: number;
}

export interface GenreSearchResponse {
    genres: Genre[];
    count: number;
}