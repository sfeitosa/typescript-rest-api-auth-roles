import { Request, Response } from 'express'
import { appRouteRepository } from '../../repositories/auth/authRepository'
import {
  userPermissionRepository,
  userRepository,
} from '../../repositories/auth/authRepository'

export class UserPermissionController {
  async create(req: Request, res: Response) {
    const {
      user,
      appRoute,
      createAllowed,
      readAllowed,
      updateAllowed,
      deleteAllowed,
    } = req.body

    const newPerm = userPermissionRepository.create({
      user,
      appRoute,
      createAllowed,
      readAllowed,
      updateAllowed,
      deleteAllowed,
    })

    try {
      await userPermissionRepository.save(newPerm)
    } catch (error) {
      return res.status(409).json({ message: 'Error saving permission.' })
    }

    return res.status(201).json({ message: 'Permission created.' })
  }

  async readAll(req: Request, res: Response) {
    const userPermissions = await userPermissionRepository.find({
      loadRelationIds: true,
    })

    res.append('X-Total-Count', userPermissions.length.toString())

    return res.send(userPermissions)
  }

  async readOne(req: Request, res: Response) {
    const { id } = req.params

    let userPermission

    try {
      userPermission = await userPermissionRepository.findOneOrFail({
        where: { id: Number(id) },
        loadRelationIds: true,
      })
    } catch (error) {
      return res.status(404).json({ message: 'Permission not found.' })
    }

    res.send(userPermission)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const {
      user,
      appRoute,
      createAllowed,
      readAllowed,
      updateAllowed,
      deleteAllowed,
    } = req.body

    let userPermission

    try {
      userPermission = await userPermissionRepository.findOneByOrFail({
        id: Number(id),
      })
    } catch (error) {
      return res.status(404).json({ message: 'Permission not found.' })
    }

    userPermission.user = user
    userPermission.appRoute = appRoute
    userPermission.createAllowed = createAllowed
    userPermission.readAllowed = readAllowed
    userPermission.updateAllowed = updateAllowed
    userPermission.deleteAllowed = deleteAllowed

    try {
      await userPermissionRepository.save(userPermission)
    } catch (error) {
      console.log(error)
      return res.status(409).json({ message: 'Error saving permission.' })
    }

    return res.status(201).send(userPermission)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    let userPermission

    try {
      userPermission = await userPermissionRepository.findOne({
        where: { id: Number(id) },
      })

      if (!userPermission) {
        return res.status(404).json({ message: 'Permission not found.' })
      }

      userPermissionRepository.delete(id)
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting permission.' })
    }

    return res.status(202).json({ message: 'Permission deleted.' })
  }
}
