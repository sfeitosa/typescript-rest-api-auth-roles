import { validate } from 'class-validator'
import { Request, Response } from 'express'
import { groupRepository } from '../../repositories/auth/authRepository'

export class GroupController {
  async create(req: Request, res: Response) {
    const { descr } = req.body

    const newGroup = groupRepository.create({ descr })

    const errors = await validate(newGroup)

    if (errors.length > 0) {
      return res.status(400).json({ message: errors })
    }

    try {
      await groupRepository.save(newGroup)
    } catch (error) {
      return res.status(409).json({ message: 'Error saving group.' })
    }

    return res.status(201).json({ message: 'Group created.' })
  }

  async readAll(req: Request, res: Response) {
    const groups = await groupRepository.find()

    res.append('X-Total-Count', groups.length.toString())

    return res.send(groups)
  }

  async readOne(req: Request, res: Response) {
    const { id } = req.params

    let group

    try {
      group = await groupRepository.findOneByOrFail({ id: Number(id) })
    } catch (error) {
      return res.status(404).json({ message: 'Group not found.' })
    }

    res.send(group)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { descr } = req.body

    let group

    try {
      group = await groupRepository.findOneByOrFail({ id: Number(id) })
    } catch (error) {
      return res.status(404).json({ message: 'Group not found.' })
    }

    group.descr = descr

    const errors = await validate(group)

    if (errors.length > 0) {
      return res.status(400).json({ message: errors })
    }

    try {
      await groupRepository.save(group)
    } catch (error) {
      return res.status(409).json({ message: 'Group name already in use.' })
    }

    return res.status(201).send(group)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    let group

    try {
      group = await groupRepository.findOneByOrFail({ id: Number(id) })
    } catch (error) {
      return res.status(404).json({ message: 'Group not found.' })
    }

    groupRepository.delete(id)

    return res.status(202).json({ message: 'Group deleted.' })
  }
}
