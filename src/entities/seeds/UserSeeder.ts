import { Seeder } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { User } from '../auth/User'

export class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(User)

    const userData = {
      username: 'admin',
      password: '@123456@',
      fullname: 'Administrator',
      email: 'admin@admin.com',
      isSuperuser: true,
    }

    const newUser = userRepository.create(userData)
    newUser.hashPassword()

    await userRepository.save(newUser)
  }
}
