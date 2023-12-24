import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { GroupService, ScheduleService } from '@modules'
import { PrismaService } from '@clients'
import { StudentQueryDto } from './dto'
import { UserService } from './user.service'
import type { IStudent } from './type'
import type { ISchedule } from '../schedule/type'

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    @Inject(forwardRef(() => GroupService))
    private groupService: GroupService,
    @Inject(forwardRef(() => ScheduleService))
    private scheduleService: ScheduleService,
  ) {}

  async joinStudent(groupId: string, studentId: string): Promise<IStudent> {
    await this.groupService.isGroupExist(groupId)
    await this.userService.userExist(studentId)

    const new_student = await this.prisma.student.create({
      data: {
        groupId: groupId,
        userId: studentId,
      },
    })

    const student: IStudent[] = await this.prisma.$queryRaw`
      SELECT s.id, u.first_name as firstName, u.last_name as lastName, u.role, u.email, g.group_name as groupName, s.group_id as groupId, s.created_at as createdAt, s.edited_at as editedAt FROM students as s LEFT JOIN user_list as u ON s.student_id = u.id
        LEFT JOIN groups as g ON s.group_id = g.id WHERE s.id::text = ${new_student.id} limit 1`

    return student[0]
  }

  async getStudent(id: string): Promise<IStudent> {
    await this.isStudentExist(id)

    const student: IStudent[] = await this.prisma.$queryRaw`
      SELECT s.id, u.first_name as firstName, u.last_name as lastName, u.role, u.email, s.group_id as groupId, g.group_name as groupName, s.created_at as createdAt, s.edited_at as editedAt FROM students as s 
        LEFT JOIN user_list as u ON s.student_id = u.id
        LEFT JOIN groups as g ON s.group_id = g.id WHERE s.id::text = ${id} limit 1`

    return student[0]
  }

  async getStudents(dto: StudentQueryDto): Promise<IStudent[]> {
    if (dto.groupId) {
      const students: IStudent[] = await this.prisma.$queryRaw`
      SELECT s.id, u.first_name as firstName, u.last_name as lastName, u.role, u.email, g.group_name as groupName, s.group_id as groupId, s.created_at as createdAt, s.edited_at as editedAt FROM students as s 
        LEFT JOIN user_list as u ON s.student_id = u.id
        LEFT JOIN groups as g ON s.group_id = g.id WHERE s.deleted_at is null and s.group_id::text = ${dto.groupId}`

      return students
    } else {
      const students: IStudent[] = await this.prisma.$queryRaw`
      SELECT s.id, u.first_name as firstName, u.last_name as lastName, u.role, u.email, g.group_name as groupName, s.group_id as groupId, s.created_at as createdAt, s.edited_at as editedAt FROM students as s 
        LEFT JOIN user_list as u ON s.student_id = u.id
        LEFT JOIN groups as g ON s.group_id = g.id WHERE s.deleted_at is null`

      return students
    }
  }

  async getStudentSchedule(id: string): Promise<ISchedule[]> {
    await this.isStudentExist(id)

    const student: IStudent = await this.getStudent(id)

    const schedule = await this.scheduleService.getSchedulesByGroup(student.groupId)

    return schedule
  }

  async createGrade(studentId: string, scheduleId: string, grade: number): Promise<any> {
    await this.isStudentExist(studentId)

    await this.scheduleService.isScheduleExist(scheduleId)

    await this.prisma.gradeObject.create({
      data: {
        studentId,
        scheduleId,
        grade,
      },
    })

    const student = await this.getStudent(studentId)

    const schedule = await this.scheduleService.getSchedule(scheduleId)

    const object = await this.prisma.object.findFirst({
      where: {
        id: schedule.objectId,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    })

    const teacher = await this.prisma.user.findFirst({
      where: {
        id: schedule.teacherId,
      },
    })

    const response = {
      id: studentId,
      firstName: student.firstname,
      lastName: student.lastname,
      teacherName: teacher.firstName,
      teacherId: teacher.id,
      grade,
      object,
      groupId: student.groupId,
      groupName: student.groupname,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    }

    return response
  }

  async isStudentExist(id: string): Promise<boolean> {
    const group = await this.prisma.student.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    })

    if (!group) throw new NotFoundException(`Student is not found with id: ${id}`)

    return true
  }
}
