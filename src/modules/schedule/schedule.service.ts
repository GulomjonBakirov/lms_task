import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@clients'
import { GroupService } from '@modules'
import { CreateScheduleDto, UpdateScheduleDto } from './dto'
import type { ISchedule } from './type'

@Injectable()
export class ScheduleService {
  readonly #_prisma: PrismaService
  readonly #_groupService: GroupService

  constructor(prisma: PrismaService, groupService: GroupService) {
    this.#_prisma = prisma
    this.#_groupService = groupService
  }

  async createSchedule(dto: CreateScheduleDto): Promise<ISchedule> {
    const schedule = await this.#_prisma.schedule.create({
      data: {
        groupId: dto.groupId,
        objectId: dto.objectId,
        teacherId: dto.teacherId,
        startTime: dto.startTime,
        endTime: dto.endTime,
      },
      select: {
        id: true,
        groupId: true,
        objectId: true,
        teacherId: true,
        startTime: true,
        endTime: true,
        createdAt: true,
        editedAt: true,
      },
    })

    return schedule
  }

  async updateSchedule(id: string, dto: UpdateScheduleDto): Promise<ISchedule> {
    await this.isScheduleExist(id)

    const schedule = await this.#_prisma.schedule.update({
      where: {
        id,
      },
      data: {
        groupId: dto.groupId,
        objectId: dto.objectId,
        teacherId: dto.teacherId,
        startTime: dto.startTime,
        endTime: dto.endTime,
      },
      select: {
        id: true,
        groupId: true,
        objectId: true,
        teacherId: true,
        startTime: true,
        endTime: true,
        createdAt: true,
        editedAt: true,
      },
    })

    return schedule
  }

  async getSchedules(groupId?: string): Promise<ISchedule[]> {
    if (groupId) {
      await this.#_groupService.isGroupExist(groupId)

      return this.#_prisma.schedule.findMany({
        where: {
          deletedAt: null,
          groupId: groupId,
        },
        select: {
          id: true,
          groupId: true,
          objectId: true,
          teacherId: true,
          startTime: true,
          endTime: true,
          createdAt: true,
          editedAt: true,
        },
      })
    } else {
      return this.#_prisma.schedule.findMany({
        where: {
          deletedAt: null,
        },
        select: {
          id: true,
          groupId: true,
          objectId: true,
          teacherId: true,
          startTime: true,
          endTime: true,
          createdAt: true,
          editedAt: true,
        },
      })
    }
  }

  async getSchedule(id: string): Promise<ISchedule> {
    await this.isScheduleExist(id)

    return this.#_prisma.schedule.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        groupId: true,
        objectId: true,
        teacherId: true,
        startTime: true,
        endTime: true,
        createdAt: true,
        editedAt: true,
      },
    })
  }

  async getSchedulesByGroup(groupId: string): Promise<ISchedule[]> {
    await this.#_groupService.isGroupExist(groupId)

    return this.#_prisma.schedule.findMany({
      where: {
        deletedAt: null,
        groupId: groupId,
      },
      select: {
        id: true,
        groupId: true,
        objectId: true,
        teacherId: true,
        startTime: true,
        endTime: true,
        createdAt: true,
        editedAt: true,
      },
    })
  }

  async isScheduleExist(id: string): Promise<boolean> {
    const schedule = await this.#_prisma.schedule.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    })

    if (!schedule) throw new NotFoundException(`Schedule is not found with id: ${id}`)

    return true
  }
}
