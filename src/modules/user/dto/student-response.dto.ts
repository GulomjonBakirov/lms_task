import { randomUUID } from 'crypto'
import { ApiProperty } from '@nestjs/swagger'
import { RolePrefix } from '@prisma/client'

export class StudentResponseDto {
  @ApiProperty({
    example: randomUUID(),
  })
  id: string

  @ApiProperty({
    example: 'group_name',
  })
  groupname: string

  @ApiProperty({
    example: randomUUID(),
  })
  groupId: string

  @ApiProperty({
    example: 'firstname',
  })
  firstname: string

  @ApiProperty({
    example: 'lastname',
  })
  lastname: string

  @ApiProperty({
    example: 'b***@gmail.com',
  })
  email: string

  @ApiProperty({
    enum: RolePrefix,
    default: RolePrefix.student,
  })
  role: string

  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date

  @ApiProperty({
    example: new Date(),
  })
  editedAt: Date
}
