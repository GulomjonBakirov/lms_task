import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
    example: 'test@gmail.com',
    required: true,
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    format: 'password',
    example: '123456',
    required: true,
  })
  password: string
}
