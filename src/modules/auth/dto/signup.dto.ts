import { ApiProperty } from '@nestjs/swagger'
import { RolePrefix } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "G'ulomjon",
    required: true,
  })
  firstName: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'Bakirov',
  })
  lastName?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
    example: 'test@gmail.com',
    required: true,
  })
  email: string

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    format: 'password',
    example: '123456',
    required: true,
    minimum: 8,
  })
  password: string

  @IsNotEmpty()
  @IsEnum(RolePrefix)
  @ApiProperty({
    enum: RolePrefix,
    required: true,
    default: RolePrefix.student,
  })
  role: RolePrefix
}
