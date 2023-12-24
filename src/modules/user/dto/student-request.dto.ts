import { ApiProperty } from '@nestjs/swagger'

export class StudentJoinRequestDto {
  @ApiProperty({
    required: true,
    example: 'group ID => UUID',
  })
  groupId: string
}

export class PutGradeRequestDto {
  @ApiProperty({
    example: 100,
    required: true,
  })
  grade: number
}
