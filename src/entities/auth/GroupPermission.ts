import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Group } from './Group'
import { AppRoute } from './AppRoute'

@Entity('auth_group_permission')
export class GroupPermission {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Group)
  group: Group

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
