import { ApiProperty } from '@nestjs/swagger'
import { RolePrefix } from '@prisma/client'
import { randomUUID } from 'crypto'

export class UserResponseDto {
  @ApiProperty({
    example: randomUUID(),
  })
  id: string

  @ApiProperty({
    example: 'b****@gmail.com',
  })
  email: string

  @ApiProperty({
    example: 'firstName',
  })
  firstName: string

  @ApiProperty({
    example: 'LastName',
  })
  lastName?: string

  @ApiProperty({
    enum: RolePrefix,
    default: RolePrefix.student,
  })
  role: RolePrefix

  @ApiProperty({
    example: new Date(),
  })
  editedAt: Date

  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date
}
