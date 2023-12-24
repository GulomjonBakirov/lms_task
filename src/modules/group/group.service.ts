import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@clients'
import { CreateGroupDto } from './dto'
import type { IGroup } from './type'

@Injectable()
export class GroupService {
  readonly #_prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma
  }

  async createGroup(dto: CreateGroupDto): Promise<IGroup> {
    const group = this.#_prisma.group.create({
      data: {
        capacity: dto.capacity,
        groupName: dto.groupName,
        teacherId: dto.teacherId,
      },
      select: {
        id: true,
        groupName: true,
        teacherId: true,
        capacity: true,
        createdAt: true,
        editedAt: true,
      },
    })

    return group
  }

  async getGroupById(id: string): Promise<IGroup> {
    await this.isGroupExist(id)

    const group = this.#_prisma.group.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        groupName: true,
        teacherId: true,
        capacity: true,
        createdAt: true,
        editedAt: true,
      },
    })

    if (!group) throw new NotFoundException(`${id} group is not find`)

    return group
  }

  async getGroups(): Promise<IGroup[]> {
    return this.#_prisma.group.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        groupName: true,
        teacherId: true,
        capacity: true,
        createdAt: true,
        editedAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
  }

  async deleteGroup(id: string): Promise<void> {
    await this.isGroupExist(id)

    await this.#_prisma.group.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }

  async isGroupExist(id: string): Promise<boolean> {
    const group = await this.#_prisma.group.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    })

    if (!group) throw new NotFoundException(`Group is not found with id: ${id}`)

    return true
  }
}
