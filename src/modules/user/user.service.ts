import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@clients'
import { CreateUserDto } from './dto'
import { AuthService } from '../auth'
import type { IUser } from '@types'

@Injectable()
export class UserService {
  readonly #_prisma: PrismaService
  readonly #_authService: AuthService

  constructor(prisma: PrismaService, authService: AuthService) {
    this.#_prisma = prisma
    this.#_authService = authService
  }

  async createUser(dto: CreateUserDto): Promise<IUser> {
    const hash = this.#_authService.hashData(dto.email)

    const user = await this.#_prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        hash,
        role: dto.role,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        editedAt: true,
        createdAt: true,
      },
    })

    return user
  }

  async getUserInfo(id: string): Promise<IUser> {
    await this.userExist(id)

    const user = await this.#_prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        editedAt: true,
        createdAt: true,
      },
    })

    return user
  }

  async deleteUser(id: string): Promise<void> {
    await this.userExist(id)

    await this.#_prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        hashedRt: null,
      },
    })
  }

  async getUsers(): Promise<IUser[]> {
    return this.#_prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        role: 'asc',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        editedAt: true,
        createdAt: true,
      },
    })
  }

  async getStudent(id: string): Promise<any> {
    await this.userExist(id)

    const student = this.#_prisma.student.findFirst({
      where: {
        userId: id,
      },
      select: {
        group: {
          select: {
            groupName: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    })

    console.log(student)
  }

  async userExist(id: string): Promise<boolean> {
    const user = await this.#_prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    })

    if (!user) throw new NotFoundException(`User is not found with id: ${id}`)

    return true
  }
}
