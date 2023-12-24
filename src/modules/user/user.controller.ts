import { ApiBody, ApiNoContentResponse, ApiOkResponse, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common'
import { HttpMessage, Role } from '@enums'
import { RolesGuard } from '@guards'
import { Roles } from '@decorators'
import { CreateUserDto, UserResponseDto } from './dto'
import { UserService } from './user.service'
import type { IUser } from '@types'

@ApiTags('User')
@Controller('user')
@ApiSecurity('jwt')
@UseGuards(RolesGuard)
export class UserController {
  readonly #_userService: UserService

  constructor(userService: UserService) {
    this.#_userService = userService
  }

  @Roles(Role.DIRECTOR)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiOkResponse({
    type: UserResponseDto,
    description: HttpMessage.CREATED,
  })
  createUser(@Body() dto: CreateUserDto): Promise<IUser> {
    return this.#_userService.createUser(dto)
  }

  @Roles(Role.DIRECTOR, Role.TEACHER)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiOkResponse({
    type: UserResponseDto,
    description: HttpMessage.CREATED,
  })
  getUserInfo(@Param('id') id: string): Promise<IUser> {
    return this.#_userService.getUserInfo(id)
  }

  @Roles(Role.DIRECTOR)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiNoContentResponse()
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.#_userService.deleteUser(id)
  }

  @Roles(Role.DIRECTOR)
  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserResponseDto,
    isArray: true,
    description: HttpMessage.CREATED,
  })
  getUsers(): Promise<IUser[]> {
    return this.#_userService.getUsers()
  }
}
