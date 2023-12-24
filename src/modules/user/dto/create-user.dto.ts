import { ApiProperty } from '@nestjs/swagger'
import { RolePrefix } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
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

  @IsNotEmpty()
  @IsEnum(RolePrefix)
  @ApiProperty({
    enum: RolePrefix,
    required: true,
    default: RolePrefix.student,
  })
  role: RolePrefix
}
