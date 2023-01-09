import { Request, Response } from 'express'
import {
  userPermissionRepository,
  appRouteRepository,
} from '../../repositories/auth/authRepository'

export class AppRouteController {
  async create(req: Request, res: Response) {
    console.log(req.body)

    return res.status(201).json({ message: 'Route created.' })
  }

  async readAll(req: Request, res: Response) {
    const appRoute = await appRouteRepository.find({
      select: ['id', 'app', 'route'],
    })

    res.append('X-Total-Count', appRoute.length.toString())

    return res.send(appRoute)
  }

  async readOne(req: Request, res: Response) {
    const { id } = req.params

    let appRoute

    try {
      appRoute = await appRouteRepository.findOneOrFail({
        where: { id: Number(id) },
        select: ['id', 'app', 'route'],
      })
    } catch (error) {
      return res.status(404).json({ message: 'Route not found.' })
    }

    res.send(appRoute)
  }

  async update(req: Request, res: Response) {
    console.log(req.body)

    return res.status(201).json({ message: 'Route updated.' })
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    let appRoute

    try {
      appRoute = await userPermissionRepository.findOne({
        where: { id: Number(id) },
      })

      if (!appRoute) {
        return res.status(404).json({ message: 'Route not found.' })
      }

      userPermissionRepository.delete(id)
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting route.' })
    }

    return res.status(202).json({ message: 'Route deleted.' })
  }
}
