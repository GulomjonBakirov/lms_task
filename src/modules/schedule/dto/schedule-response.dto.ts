import { ApiProperty } from '@nestjs/swagger'
import { randomUUID } from 'crypto'

export class ScheduleResponseDto {
  @ApiProperty({
    example: randomUUID(),
  })
  id: string

  @ApiProperty({
    example: randomUUID(),
  })
  groupId: string

  @ApiProperty({
    example: randomUUID(),
  })
  objectId: string

  @ApiProperty({
    example: randomUUID(),
  })
  teacherId: string

  @ApiProperty({
    example: new Date(),
  })
  startTime: Date

  @ApiProperty({
    example: new Date(),
  })
  endTime: Date

  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date

  @ApiProperty({
    example: new Date(),
  })
  editedAt: Date
}
