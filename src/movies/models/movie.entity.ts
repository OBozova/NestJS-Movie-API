import { Genre } from "../../genres/models/genre.entity";
import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToMany, JoinTable } from "typeorm";

@Entity()
@Index(["title", "releaseDate"], { unique: true })
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'date',
    })
    releaseDate: string;

    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[]
}