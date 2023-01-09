import { Request, Response } from 'express'
import {
  appRouteRepository,
  groupPermissionRepository,
  groupRepository,
} from '../../repositories/auth/authRepository'

export class GroupPermissionController {
  async create(req: Request, res: Response) {
    const {
      group,
      appRoute,
      createAllowed,
      readAllowed,
      updateAllowed,
      deleteAllowed,
    } = req.body

    const newPerm = groupPermissionRepository.create({
      group,
      appRoute,
      createAllowed,
      readAllowed,
      updateAllowed,
      deleteAllowed,
    })

    try {
      await groupPermissionRepository.save(newPerm)
    } catch (error) {
      return res.status(409).json({ message: 'Error saving permission.' })
    }

    return res.status(201).json({ message: 'Permission created.' })
  }

  async readAll(req: Request, res: Response) {
    const groupPermissions = await groupPermissionRepository.find({
      loadRelationIds: true,
    })

    res.append('X-Total-Count', groupPermissions.length.toString())

    return res.send(groupPermissions)
  }

  async readOne(req: Request, res: Response) {
    const { id } = req.params

    let groupPermission

    try {
      groupPermission = await groupPermissionRepository.findOneOrFail({
        where: { id: Number(id) },
        loadRelationIds: true,
      })
    } catch (error) {
      return res.status(404).json({ message: 'Permission not found.' })
    }

    res.send(groupPermission)
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

    let groupPermission

    try {
      groupPermission = await groupPermissionRepository.findOneByOrFail({
        id: Number(id),
      })
    } catch (error) {
      return res.status(404).json({ message: 'Permission not found.' })
    }

    groupPermission.group = user
    groupPermission.appRoute = appRoute
    groupPermission.createAllowed = createAllowed
    groupPermission.readAllowed = readAllowed
    groupPermission.updateAllowed = updateAllowed
    groupPermission.deleteAllowed = deleteAllowed

    try {
      await groupPermissionRepository.save(groupPermission)
    } catch (error) {
      console.log(error)
      return res.status(409).json({ message: 'Error saving permission.' })
    }

    return res.status(201).send(groupPermission)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    let groupPermission

    try {
      groupPermission = await groupPermissionRepository.findOne({
        where: { id: Number(id) },
      })

      if (!groupPermission) {
        return res.status(404).json({ message: 'Permission not found.' })
      }

      groupPermissionRepository.delete(id)
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting permission.' })
    }

    return res.status(202).json({ message: 'Permission deleted.' })
  }
}
