import { ApiBody, ApiExtraModels, ApiOkResponse, ApiSecurity, ApiTags, refs } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { HttpMessage, Role } from '@enums'
import { RolesGuard } from '@guards'
import { Roles } from '@decorators'
import { ObjectService } from './object.service'
import {
  AvgGradeGroupTypeResponse,
  AvgGradeStudentTypeResponse,
  CreateObjectDto,
  ObjectResponseDto,
  QueryTypeDto,
  UpdateObjectDto,
} from './dto'
import type { AvgGradeGroupType, AvgGradeStudentType, IObject } from './type'

@ApiSecurity('jwt')
@UseGuards(RolesGuard)
@Controller('object')
export class ObjectController {
  readonly #_objectService: ObjectService

  constructor(objectService: ObjectService) {
    this.#_objectService = objectService
  }

  @ApiTags('Object')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.DIRECTOR)
  @ApiBody({
    type: CreateObjectDto,
  })
  @ApiOkResponse({
    type: ObjectResponseDto,
    description: HttpMessage.CREATED,
  })
  createObject(@Body() dto: CreateObjectDto): Promise<IObject> {
    return this.#_objectService.createObject(dto)
  }

  @ApiTags('Object')
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ObjectResponseDto,
    description: HttpMessage.CREATED,
  })
  getObject(@Param('id') id: string): Promise<IObject> {
    return this.#_objectService.getObject(id)
  }

  @ApiTags('Object')
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ObjectResponseDto,
    description: HttpMessage.CREATED,
  })
  getObjects(): Promise<IObject[]> {
    return this.#_objectService.getObjects()
  }

  @ApiTags('Object')
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.DIRECTOR)
  @ApiBody({
    type: CreateObjectDto,
  })
  @ApiOkResponse({
    type: ObjectResponseDto,
    description: HttpMessage.CREATED,
  })
  updateObject(@Body() dto: UpdateObjectDto, @Param('id') id: string): Promise<IObject> {
    return this.#_objectService.updateObject(id, dto)
  }

  @ApiTags('Object')
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.DIRECTOR)
  deleteObject(@Param('id') id: string): Promise<void> {
    return this.#_objectService.deleteObject(id)
  }

  @ApiTags('Average Grade')
  @Get('/:id/grade')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.DIRECTOR, Role.TEACHER)
  @ApiExtraModels(AvgGradeGroupTypeResponse, AvgGradeStudentTypeResponse)
  @ApiOkResponse({
    schema: { anyOf: refs(AvgGradeGroupTypeResponse, AvgGradeStudentTypeResponse) },
  })
  getAvgGradeByObject(
    @Param('id') id: string,
    @Query() dto: QueryTypeDto,
  ): Promise<AvgGradeGroupType | AvgGradeStudentType> {
    return this.#_objectService.getAvgGradeByObject(id, dto)
  }
}
