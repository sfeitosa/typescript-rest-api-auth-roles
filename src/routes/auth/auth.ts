import { Router } from 'express'
import { AuthController } from '../../controllers/auth/AuthController'
import { UserController } from '../../controllers/auth/UserController'
import { GroupController } from '../../controllers/auth/GroupController'
import { checkJwt } from '../../middlewares/checkJwt'
import { checkPermission } from '../../middlewares/checkPermission'
import { UserPermissionController } from '../../controllers/auth/UserPermissionController'
import { AppRouteController } from '../../controllers/auth/AppRouteController'
import { GroupPermissionController } from '../../controllers/auth/GroupPermissionController'

const router = Router()

// Auth routes
router.post('/login', new AuthController().login)
router.post('/change-password', [checkJwt], new AuthController().changePassword)

// User routes
router.post(
  '/user',
  [checkJwt, checkPermission('auth', 'user', 'create')],
  new UserController().create,
)
router.get(
  '/user',
  [checkJwt, checkPermission('auth', 'user', 'read')],
  new UserController().readAll,
)
router.get(
  '/user/:id',
  [checkJwt, checkPermission('auth', 'user', 'read')],
  new UserController().readOne,
)
router.put(
  '/user/:id',
  [checkJwt, checkPermission('auth', 'user', 'update')],
  new UserController().update,
)
router.delete(
  '/user/:id',
  [checkJwt, checkPermission('auth', 'user', 'delete')],
  new UserController().delete,
)

// Group routes
router.post(
  '/group',
  [checkJwt, checkPermission('auth', 'group', 'create')],
  new GroupController().create,
)
router.get(
  '/group',
  [checkJwt, checkPermission('auth', 'group', 'read')],
  new GroupController().readAll,
)
router.get(
  '/group/:id',
  [checkJwt, checkPermission('auth', 'group', 'read')],
  new GroupController().readOne,
)
router.put(
  '/group/:id',
  [checkJwt, checkPermission('auth', 'group', 'update')],
  new GroupController().update,
)
router.delete(
  '/group/:id',
  [checkJwt, checkPermission('auth', 'group', 'delete')],
  new GroupController().delete,
)

// UserPermission routes
router.post(
  '/user-permission',
  [checkJwt, checkPermission('auth', 'user-permission', 'create')],
  new UserPermissionController().create,
)
router.get(
  '/user-permission',
  [checkJwt, checkPermission('auth', 'user-permission', 'read')],
  new UserPermissionController().readAll,
)
router.get(
  '/user-permission/:id',
  [checkJwt, checkPermission('auth', 'user-permission', 'read')],
  new UserPermissionController().readOne,
)
router.put(
  '/user-permission/:id',
  [checkJwt, checkPermission('auth', 'user-permission', 'update')],
  new UserPermissionController().update,
)
router.delete(
  '/user-permission/:id',
  [checkJwt, checkPermission('auth', 'user-permission', 'delete')],
  new UserPermissionController().delete,
)

// GroupPermission routes
router.post(
  '/group-permission',
  [checkJwt, checkPermission('auth', 'group-permission', 'create')],
  new GroupPermissionController().create,
)
router.get(
  '/group-permission',
  [checkJwt, checkPermission('auth', 'group-permission', 'read')],
  new GroupPermissionController().readAll,
)
router.get(
  '/group-permission/:id',
  [checkJwt, checkPermission('auth', 'group-permission', 'read')],
  new GroupPermissionController().readOne,
)
router.put(
  '/group-permission/:id',
  [checkJwt, checkPermission('auth', 'group-permission', 'update')],
  new GroupPermissionController().update,
)
router.delete(
  '/group-permission/:id',
  [checkJwt, checkPermission('auth', 'group-permission', 'delete')],
  new GroupPermissionController().delete,
)

// AppRoute routes
router.post(
  '/app-route',
  [checkJwt, checkPermission('auth', 'app-route', 'create')],
  new AppRouteController().create,
)
router.get(
  '/app-route',
  [checkJwt, checkPermission('auth', 'app-route', 'read')],
  new AppRouteController().readAll,
)
router.get(
  '/app-route/:id',
  [checkJwt, checkPermission('auth', 'app-route', 'read')],
  new AppRouteController().readOne,
)
router.put(
  '/app-route/:id',
  [checkJwt, checkPermission('auth', 'app-route', 'update')],
  new AppRouteController().update,
)
router.delete(
  '/app-route/:id',
  [checkJwt, checkPermission('auth', 'app-route', 'delete')],
  new AppRouteController().delete,
)

export default router
