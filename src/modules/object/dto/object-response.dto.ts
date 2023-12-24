import { ApiProperty } from '@nestjs/swagger'

export class ObjectResponseDto {
  @ApiProperty({
    example: 'UUID',
  })
  id: string

  @ApiProperty({
    example: 'name of object',
  })
  name: string

  @ApiProperty({
    example: 'description',
  })
  description: string

  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date

  @ApiProperty({
    example: new Date(),
  })
  editedAt: Date
}

export class AvgGradeGroupTypeResponse {
  @ApiProperty({
    example: 80,
  })
  avg_grade: number

  @ApiProperty({
    example: 'name',
  })
  group_name: string

  @ApiProperty({
    example: 'subject',
  })
  subject: string
}

export class AvgGradeStudentTypeResponse {
  @ApiProperty({
    example: 100,
  })
  avg_grade: number

  @ApiProperty({
    example: 'firstname',
  })
  first_name: string

  @ApiProperty({
    example: 'lastname',
  })
  last_name: string

  @ApiProperty({
    example: 'groupname',
  })
  group_name: string

  @ApiProperty({
    example: 'subject',
  })
  subject: string
}
