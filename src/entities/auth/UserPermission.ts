import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
import { AppRoute } from './AppRoute'
import { userPermissionRepository } from '../../repositories/auth/authRepository'

@Entity('auth_user_permission')
export class UserPermission {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => AppRoute)
  appRoute: AppRoute

  @Column()
  createAllowed: boolean

  @Column()
  readAllowed: boolean

  @Column()
  updateAllowed: boolean

  @Column()
  deleteAllowed: boolean

  checkPermission(op: string) {
    switch (op) {
      case 'create': {
        return this.createAllowed
      }
      case 'read': {
        return this.readAllowed
      }
      case 'update': {
        return this.updateAllowed
      }
      case 'delete': {
        return this.deleteAllowed
      }
    }

    return false
  }
}
