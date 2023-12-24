import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateObjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Physics',
  })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: false,
    example: 'Physics for 7 class',
  })
  description: string
}
