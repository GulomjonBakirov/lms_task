import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from '@guards'
import { HttpMessage, Role } from '@enums'
import { Roles } from '@decorators'
import { ScheduleService } from './schedule.service'
import { CreateScheduleDto, ScheduleResponseDto, UpdateScheduleDto } from './dto'
import type { ISchedule } from './type'

@ApiTags('Schedule')
@ApiSecurity('jwt')
@UseGuards(RolesGuard)
@Controller('schedule')
export class ScheduleController {
  readonly #_scheduleService: ScheduleService

  constructor(scheduleService: ScheduleService) {
    this.#_scheduleService = scheduleService
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.DIRECTOR)
  @ApiBody({
    type: CreateScheduleDto,
  })
  @ApiOkResponse({
    type: ScheduleResponseDto,
    description: HttpMessage.CREATED,
  })
  createSchedule(@Body() dto: CreateScheduleDto): Promise<ISchedule> {
    return this.#_scheduleService.createSchedule(dto)
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.DIRECTOR)
  @ApiOkResponse({
    type: ScheduleResponseDto,
    description: HttpMessage.CREATED,
  })
  @ApiBody({
    type: CreateScheduleDto,
  })
  updateSchedule(@Param('id') id: string, @Body() dto: UpdateScheduleDto): Promise<ISchedule> {
    return this.#_scheduleService.updateSchedule(id, dto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.DIRECTOR, Role.TEACHER)
  @ApiQuery({
    name: 'group',
    required: false,
  })
  @ApiOkResponse({
    type: ScheduleResponseDto,
    description: HttpMessage.CREATED,
  })
  getSchedules(@Query('group') group?: string): Promise<ISchedule[]> {
    return this.#_scheduleService.getSchedules(group)
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ScheduleResponseDto,
    description: HttpMessage.CREATED,
  })
  getSchedule(@Param('id') id: string): Promise<ISchedule> {
    return this.#_scheduleService.getSchedule(id)
  }
}
