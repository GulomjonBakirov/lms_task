import { PrismaClient, RolePrefix } from '@prisma/client'
import { createHmac } from 'crypto'

const prisma = new PrismaClient()

declare interface IUser {
  firstName: string
  lastName?: string
  hash: string
  email: string
  role: RolePrefix
}

declare interface IGroup {
  groupName: string
  capacity: number
  teacherId: string
}

const director: IUser = {
  firstName: 'Director',
  email: 'director@gmail.com',
  hash: createHmac('sha512', '123').update('director').digest('hex'),
  role: RolePrefix.director,
}

const student: IUser = {
  firstName: 'Student',
  email: 'student@gmail.com',
  hash: createHmac('sha512', '123').update('student').digest('hex'),
  role: RolePrefix.student,
}

const teacher: IUser = {
  firstName: 'Teacher',
  email: 'teacher@gmail.com',
  hash: createHmac('sha512', '123').update('teacher').digest('hex'),
  role: RolePrefix.teacher,
}

async function main() {
  console.log('--------------- Seeding ------------- ')
  await prisma.user.createMany({
    data: [director, student, teacher],
  })

  const new_teacher = await prisma.user.findFirst({
    where: {
      email: 'teacher@gmail.com',
    },
  })

  const student_user = await prisma.user.findFirst({
    where: {
      email: 'student@gmail.com',
    },
  })

  const group: IGroup = {
    groupName: 'test group',
    capacity: 20,
    teacherId: new_teacher.id,
  }

  const new_group = await prisma.group.create({
    data: group,
  })

  const new_student = await prisma.student.create({
    data: {
      userId: student_user.id,
      groupId: new_group.id,
    },
  })

  const new_subject = await prisma.object.create({
    data: {
      name: 'test',
      description: 'test desc',
    },
  })

  const new_schedule = await prisma.schedule.create({
    data: {
      groupId: new_group.id,
      objectId: new_subject.id,
      teacherId: new_teacher.id,
      startTime: new Date('2023-12-24').toISOString(),
      endTime: new Date('2023-12-25').toISOString(),
    },
  })

  console.log('***************- Seed data users, student, group, object, schedule- **************')
  console.log('User Teacher: {email: teacher@gmail.com, password: teacher}')
  console.log('Director Teacher: {email: director@gmail.com, password: director}')
  console.log('Student Teacher: {email: student@gmail.com, password: student}')
}

main()
