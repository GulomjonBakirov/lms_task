import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common'
import { ApiSecurity, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from '@guards'
import type { IUser } from '@types'
import { Roles } from '@decorators'
import { Role } from '@enums'
import { CreateUserDto } from './dto'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('user')
@ApiSecurity('jwt')
@UseGuards(RolesGuard)
export class UserController {
  readonly #_userService: UserService

  constructor(userService: UserService) {
    this.#_userService = userService
  }

  // createStudent() {}

  @Roles(Role.DIRECTOR)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() dto: CreateUserDto): Promise<IUser> {
    return this.#_userService.createUser(dto)
  }

  @Roles(Role.DIRECTOR, Role.TEACHER)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getUserInfo(@Param('id') id: string): Promise<IUser> {
    return this.#_userService.getUserInfo(id)
  }

  @Roles(Role.DIRECTOR)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.#_userService.deleteUser(id)
  }

  @Roles(Role.DIRECTOR)
  @Get('')
  @HttpCode(HttpStatus.OK)
  getUsers(): Promise<IUser[]> {
    return this.#_userService.getUsers()
  }
}
