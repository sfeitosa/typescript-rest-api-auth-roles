import { validate } from 'class-validator'
import { Request, Response } from 'express'
import { userRepository } from '../../repositories/auth/authRepository'
import { Group } from '../../entities/auth/Group'
import { User } from '../../entities/auth/User'

export class UserController {
  async create(req: Request, res: Response) {
    const {
      username,
      fullname,
      password,
      email,
      isSuperuser,
      groupIds,
    } = req.body

    console.log(req.body)

    let groups = []

    if (groupIds) {
      groups = groupIds.map((id: number) => ({ ...new User(), id }))
    }

    const newUser = userRepository.create({
      username,
      fullname,
      password,
      email,
      isSuperuser,
      groups,
    })

    const errors = await validate(newUser)

    if (errors.length > 0) {
      return res.status(400).json({ message: errors })
    }

    newUser.hashPassword()

    console.log(newUser)

    try {
      await userRepository.save(newUser)
    } catch (error) {
      return res.status(409).json({ message: 'Error creating user: ' + error })
    }

    return res.status(201).json({ message: 'User created.' })
  }

  async readAll(req: Request, res: Response) {
    const users = await userRepository.find({
      select: ['id', 'username', 'fullname', 'email', 'isSuperuser'],
      relations: { groups: true },
    })

    res.append('X-Total-Count', users.length.toString())

    return res.send(users)
  }

  async readOne(req: Request, res: Response) {
    const { id } = req.params

    let user

    try {
      user = await userRepository.findOneOrFail({
        where: { id: Number(id) },
        select: ['id', 'username', 'fullname', 'email', 'isSuperuser'],
        relations: { groups: true },
      })
    } catch (error) {
      return res.status(404).json({ message: 'User not found.' })
    }

    res.send(user)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { username, fullname, email, isSuperuser, groupIds } = req.body

    let user

    try {
      user = await userRepository.findOneByOrFail({ id: Number(id) })
    } catch (error) {
      return res.status(404).json({ message: 'User not found.' })
    }

    user.username = username
    user.fullname = fullname
    user.email = email
    user.isSuperuser = isSuperuser
    user.groupIds = groupIds

    if (groupIds) {
      user.groups = groupIds.map((id: number) => ({ ...new Group(), id }))
    } else {
      user.groups = []
    }

    const errors = await validate(user)

    if (errors.length > 0) {
      return res.status(400).json({ message: errors })
    }

    try {
      await userRepository.save(user)
    } catch (error) {
      return res.status(409).json({ message: 'Username already in use.' })
    }

    return res.status(201).send(user)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    let user

    try {
      user = await userRepository.findOne({
        where: { id: Number(id) },
        relations: { groups: true },
      })

      if (!user) {
        return res.status(404).json({ message: 'User not found.' })
      }

      userRepository.delete(id)
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting user.' })
    }

    return res.status(202).json({ message: 'User deleted.' })
  }
}
