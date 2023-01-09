import { DataSource } from 'typeorm'
import { Seeder, runSeeder } from 'typeorm-extension'
import { AppRouteSeeder } from './AppRouteSeeder'
import { UserSeeder } from './UserSeeder'

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    // await runSeeder(dataSource, UserSeeder)
    await runSeeder(dataSource, AppRouteSeeder)
  }
}
