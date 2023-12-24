import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@clients'
import { CreateObjectDto, UpdateObjectDto, QueryTypeDto } from './dto'
import { AvgType } from './enum'
import type { AvgGradeGroupType, AvgGradeStudentType, IObject } from './type'

@Injectable()
export class ObjectService {
  readonly #_prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma
  }

  async createObject(dto: CreateObjectDto): Promise<IObject> {
    const object = await this.#_prisma.object.create({
      data: {
        name: dto.name,
        description: dto.description,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        editedAt: true,
      },
    })

    return object
  }

  async getObject(id: string): Promise<IObject> {
    await this.isObjectExist(id)

    const object = await this.#_prisma.object.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        editedAt: true,
      },
    })

    return object
  }

  async getObjects(): Promise<IObject[]> {
    return this.#_prisma.object.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        editedAt: true,
        // _count: true,
      },
    })
  }

  async updateObject(id: string, dto: UpdateObjectDto): Promise<IObject> {
    await this.isObjectExist(id)

    const object = await this.#_prisma.object.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        description: dto.description,
      },
    })

    return object
  }

  async deleteObject(id: string): Promise<void> {
    await this.isObjectExist(id)

    await this.#_prisma.object.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        editedAt: true,
      },
    })
  }

  async getAvgGradeByObject(objectId: string, dto: QueryTypeDto): Promise<AvgGradeStudentType | AvgGradeGroupType> {
    await this.isObjectExist(objectId)

    if (dto.type == AvgType.STUDENT) {
      const response: AvgGradeStudentType = await this.#_prisma
        .$queryRaw`SELECT AVG(go.grade) as avg_grade, u.first_name , u.last_name, g.group_name , o.name as subject FROM grade_object as go 
            LEFT JOIN students  as  s ON go.student_id = s.id 
            LEFT JOIN user_list as u ON u.id = s.student_id 
            LEFT JOIN schedule as sch ON sch.id = go.schedule_id
            LEFT JOIN groups as g ON g.id = sch.group_id
            LEFT JOIN objects as o ON sch.object_id = o.id
            WHERE sch.object_id::text = ${objectId} GROUP BY sch.object_id, u.first_name, u.last_name, g.group_name, o.name order by g.group_name desc, u.first_name desc
            `
      return response
    } else {
      const response: AvgGradeGroupType = await this.#_prisma
        .$queryRaw`SELECT AVG(go.grade) as avg_grade, g.group_name , o.name as subject FROM grade_object as go 
            LEFT JOIN students  as  s ON go.student_id = s.id 
            LEFT JOIN user_list as u ON u.id = s.student_id 
            LEFT JOIN schedule as sch ON sch.id = go.schedule_id
            LEFT JOIN groups as g ON g.id = sch.group_id
            LEFT JOIN objects as o ON sch.object_id = o.id
            WHERE sch.object_id::text = ${objectId} GROUP BY sch.object_id, g.id, g.group_name, o.name order by g.group_name desc
            `
      return response
    }
  }

  async isObjectExist(id: string): Promise<boolean> {
    const object = await this.#_prisma.object.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    })

    if (!object) throw new NotFoundException(`Object is not found with id: ${id}`)

    return true
  }
}
