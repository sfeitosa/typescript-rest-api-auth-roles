import { AppDataSource } from '../../data-source'
import { User } from '../../entities/auth/User'
import { Group } from '../../entities/auth/Group'
import { UserPermission } from '../../entities/auth/UserPermission'
import { GroupPermission } from '../../entities/auth/GroupPermission'
import { AppRoute } from '../../entities/auth/AppRoute'

export const userRepository = AppDataSource.getRepository(User)
export const groupRepository = AppDataSource.getRepository(Group)
export const appRouteRepository = AppDataSource.getRepository(AppRoute)
export const userPermissionRepository = AppDataSource.getRepository(
  UserPermission,
)
export const groupPermissionRepository = AppDataSource.getRepository(
  GroupPermission,
)
