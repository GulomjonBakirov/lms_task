import { RolePrefix } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsEnum(RolePrefix)
  @IsNotEmpty()
  role: RolePrefix
}
