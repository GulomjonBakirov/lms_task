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

  console.log(`--------------- User Director: ${JSON.stringify(director)} ------`)
  console.log(`--------------- User Student: ${JSON.stringify(student)} ------`)
  console.log(`--------------- User Teacher: ${JSON.stringify(teacher)} ------`)
}

main()
