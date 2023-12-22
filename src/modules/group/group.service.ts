import { UserService } from '@modules'
import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateGroupDto } from './dto'
import { PrismaService } from '@clients'
import { IGroup } from './type'

@Injectable()
export class GroupService {
  readonly #_prisma: PrismaService
  readonly #_userService: UserService

  constructor(prisma: PrismaService, userService: UserService) {
    this.#_prisma = prisma
    this.#_userService = userService
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

  async joinToGroup(groupId: string, studentId: string): Promise<any> {
    await this.isGroupExist(groupId)
    await this.#_userService.userExist(studentId)

    const new_student = await this.#_prisma.student.create({
      data: {
        groupId: groupId,
        userId: studentId,
      },
    })

    console.log(new_student.id)

    const student = await this.#_prisma.$queryRaw`
      SELECT s.id, u.first_name as firstName, u.last_name as lastName, u.role, u.email, g.group_name as groupName, s.created_at as createdAt, s.edited_at as editedAt FROM students as s LEFT JOIN user_list as u ON s.student_id = u.id
        LEFT JOIN groups as g ON s.group_id = g.id WHERE s.id::text = ${new_student.id}`

    return student
  }

  async isGroupExist(id: string): Promise<boolean> {
    console.log(id)

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
