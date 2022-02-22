import dotenv from 'dotenv';
import {ConnectionOptions} from 'typeorm';

dotenv.config();

if (!process.env.DATABASE_HOST) {
 throw new Error('No Db Config Info');
}

export const typeormConfig: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    // option
    entities: ['src/entities/*'],
    migrations: ['src/migrations/**/*.ts'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
    }
}