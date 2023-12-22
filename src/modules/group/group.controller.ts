import { RolesGuard } from './../../guards/roles.guard'
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
import { GroupService } from './group.service'
import { CreateGroupDto, CreateGroupResponseDto } from './dto'
import type { IGroup } from './type'
import {
  BadRequestResponse,
  ConflictResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
} from '@swagger'
import { HttpMessage, Role } from '@enums'
import { Roles } from '@decorators'

@ApiTags('Group')
@ApiSecurity('jwt')
@Controller('group')
@UseGuards(RolesGuard)
export class GroupController {
  readonly #_groupService: GroupService

  constructor(groupService: GroupService) {
    this.#_groupService = groupService
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN, Role.DIRECTOR)
  @ApiBody({
    type: CreateGroupDto,
  })
  @ApiCreatedResponse({
    type: CreateGroupResponseDto,
    status: HttpStatus.CREATED,
  })
  @ApiForbiddenResponse({
    type: ForbiddenResponse,
    description: HttpMessage.FORBIDDEN,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
    description: HttpMessage.BAD_REQUEST,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
    description: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  @ApiConflictResponse({
    type: ConflictResponse,
    description: HttpMessage.CONFLICT,
  })
  createGroup(@Body() dto: CreateGroupDto): Promise<IGroup> {
    return this.#_groupService.createGroup(dto)
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiOkResponse({
    type: CreateGroupResponseDto,
    status: HttpStatus.OK,
  })
  @ApiForbiddenResponse({
    type: ForbiddenResponse,
    description: HttpMessage.FORBIDDEN,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
    description: HttpMessage.BAD_REQUEST,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
    description: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  @ApiConflictResponse({
    type: ConflictResponse,
    description: HttpMessage.CONFLICT,
  })
  @ApiNotFoundResponse({
    type: NotFoundResponse,
    description: HttpMessage.NOT_FOUND,
  })
  getGroupById(@Param('id') id: string): Promise<IGroup> {
    return this.#_groupService.getGroupById(id)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.TEACHER, Role.DIRECTOR)
  getGroups(): Promise<IGroup[]> {
    return this.#_groupService.getGroups()
  }

  @Post('/student/:studentId')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.DIRECTOR)
  joinToGroup(@Body('groupId') groupId: string, @Param('studentId') studentId: string): Promise<any> {
    return this.#_groupService.joinToGroup(groupId, studentId)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.DIRECTOR)
  deleteGroup(@Param('id') id: string): Promise<void> {
    return this.#_groupService.deleteGroup(id)
  }
}
