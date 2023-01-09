import { Seeder } from 'typeorm-extension'
import { DataSource } from 'typeorm'
// import { appRouteRepository } from '../../repositories/auth/authRepository'
import { AppRoute } from '../auth/AppRoute'

export class AppRouteSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const appRouteRepository = dataSource.getRepository(AppRoute)

    await appRouteRepository.clear()

    appRouteRepository.query(
      "UPDATE sqlite_sequence SET seq = 0 WHERE name = 'auth_app_routes'",
    )

    await appRouteRepository.insert([
      { app: 'auth', route: 'user' },
      { app: 'auth', route: 'group' },
      { app: 'auth', route: 'user-permission' },
      { app: 'auth', route: 'group-permission' },
    ])
  }
}
