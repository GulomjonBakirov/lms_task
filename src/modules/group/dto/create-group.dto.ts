import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength } from 'class-validator'

export class CreateGroupDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty({
    example: 'test group',
    required: true,
  })
  groupName: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 30,
    required: true,
  })
  capacity: number

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Teacher ID',
    required: true,
  })
  teacherId: string
}
