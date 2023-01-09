import { Request, Response, NextFunction } from 'express'
import {
  userPermissionRepository,
  appRouteRepository,
  groupPermissionRepository,
  userRepository,
} from '../repositories/auth/authRepository'

export const checkPermission = (app: string, route: string, op: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId

    console.log(
      `Checking permision '${op}' for user '${id}' to route '${route}'`,
    )

    try {
      const user = await userRepository.findOneOrFail({
        where: { id: Number(id) },
      })

      if (user.isSuperuser) {
        next()
        return
      }
    } catch (error) {
      res.status(401).json({ message: 'Invalid user.' })
      return
    }

    const appRoute = await appRouteRepository
      .createQueryBuilder('approute')
      .where('approute.app = :app', { app })
      .andWhere('approute.route = :route', { route })
      .getOne()

    if (!appRoute) {
      res
        .status(404)
        .json({ message: 'Route not found when checking permissions.' })
      return
    }

    const appRouteId = appRoute.id

    // Checking User and Group permissions
    const userPerm = await userPermissionRepository
      .createQueryBuilder('UserPermission')
      .where('UserPermission.userId = :id', { id })
      .andWhere('UserPermission.appRouteId = :appRouteId', { appRouteId })
      .getOne()

    if (userPerm && userPerm.checkPermission(op)) {
      console.log('User allowed by User Permission!')

      next()
      return
    }

    const groupPerm = await groupPermissionRepository
      .createQueryBuilder('GroupPermission')
      .leftJoinAndSelect(
        'auth_users_groups_auth_groups',
        'UserGroup',
        'UserGroup.authGroupsId = GroupPermission.groupId',
      )
      .where('UserGroup.authUsersId = :id', { id })
      .andWhere('GroupPermission.appRouteId = :appRouteId', { appRouteId })
      .getOne()

    if (groupPerm && groupPerm.checkPermission(op)) {
      console.log('User allowed by Group Permission!')

      next()
      return
    }

    console.log('User is not allowed to access this resource.')

    res
      .status(401)
      .json({ message: 'User is not allowed to access this resource.' })
  }
}
