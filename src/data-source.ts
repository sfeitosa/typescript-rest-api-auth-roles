import 'dotenv/config'
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import { MainSeeder } from './entities/seeds/MainSeeder'

const options: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: process.env.DB_NAME ?? '',
  entities: [`${__dirname}/**/entities/**/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  seeds: [MainSeeder],
}

export const AppDataSource = new DataSource(options)
