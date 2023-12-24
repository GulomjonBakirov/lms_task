import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from '@guards'
import { Roles } from '@decorators'
import { Role } from '@enums'
import { ScheduleResponseDto } from '../schedule/dto'
import { StudentService } from './student.service'
import { PutGradeRequestDto, StudentJoinRequestDto, StudentQueryDto, StudentResponseDto } from './dto'
import type { IStudent } from './type'
import type { ISchedule } from '../schedule/type'

@ApiSecurity('jwt')
@Controller('student')
@UseGuards(RolesGuard)
export class StudentController {
  readonly #_studentService: StudentService

  constructor(studentService: StudentService) {
    this.#_studentService = studentService
  }

  @ApiTags('Student')
  @Post('/:userId')
  @Roles(Role.DIRECTOR)
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: StudentJoinRequestDto,
  })
  @ApiOkResponse({
    type: StudentResponseDto,
  })
  joinStudent(@Param('userId') userId: string, @Body('groupId') groupId: string): Promise<IStudent> {
    return this.#_studentService.joinStudent(groupId, userId)
  }

  @ApiTags('Student')
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.DIRECTOR, Role.TEACHER)
  @ApiOkResponse({
    type: StudentResponseDto,
  })
  getStudent(@Param('id') id: string): Promise<IStudent> {
    return this.#_studentService.getStudent(id)
  }

  @ApiTags('Student')
  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.DIRECTOR, Role.TEACHER)
  @ApiOkResponse({
    type: StudentResponseDto,
  })
  getStudents(@Query() dto: StudentQueryDto): Promise<IStudent[]> {
    return this.#_studentService.getStudents(dto)
  }

  @ApiTags('Student')
  @Get('/:studentId/schedule')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.STUDENT, Role.DIRECTOR, Role.TEACHER)
  @ApiOkResponse({
    type: ScheduleResponseDto,
  })
  getSchedulesToStudent(@Param('studentId') id: string): Promise<ISchedule[]> {
    return this.#_studentService.getStudentSchedule(id)
  }

  @ApiTags('Put Grade')
  @Post('/:studentId/schedule/:scheduleId')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.TEACHER)
  @ApiOkResponse({
    type: ScheduleResponseDto,
  })
  @ApiParam({
    name: 'scheduleId',
    required: true,
  })
  @ApiParam({
    name: 'studentId',
    required: true,
  })
  @ApiBody({
    required: true,
    type: PutGradeRequestDto,
  })
  createGrade(@Param() params: { studentId: string; scheduleId: string }, @Body('grade') grade: number): Promise<any> {
    return this.#_studentService.createGrade(params.studentId, params.scheduleId, grade)
  }
}
