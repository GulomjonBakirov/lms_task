import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'UUID',
  })
  groupId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'UUID',
  })
  objectId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'UUID',
  })
  teacherId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: new Date(),
  })
  startTime: Date

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: new Date(),
  })
  endTime: Date
}
