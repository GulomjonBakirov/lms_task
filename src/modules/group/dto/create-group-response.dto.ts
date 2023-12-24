import { ApiProperty } from '@nestjs/swagger'
import { randomUUID } from 'crypto'

export class CreateGroupResponseDto {
  @ApiProperty({
    example: randomUUID(),
  })
  id: string
  @ApiProperty()
  groupName: string
  @ApiProperty()
  teacherId: string
  @ApiProperty()
  capacity: number
  @ApiProperty()
  createdAt: Date
  @ApiProperty()
  editedAt: Date
}
