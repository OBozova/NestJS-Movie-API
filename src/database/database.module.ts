import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../movies/models/movie.entity'; 
import { Genre } from '../genres/models/genre.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule], 
            inject: [ConfigService],

            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get('DATABASE_URL'), 
                entities: [Movie, Genre],
                synchronize: true
            }),
        }),
    ],
})
export class DatabaseModule {}
