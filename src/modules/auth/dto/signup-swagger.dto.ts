import { ApiProperty } from '@nestjs/swagger'
import { RolePrefix } from '@prisma/client'

export class SignUpRequestDto {
  @ApiProperty({
    format: 'email',
    example: 'test@gmail.com',
    required: true,
  })
  email: string

  @ApiProperty({
    format: 'password',
    example: '123456',
    required: true,
  })
  password: string

  @ApiProperty({
    example: "G'ulomjon",
    required: true,
  })
  firstName: string

  @ApiProperty({
    required: false,
    example: 'Bakirov',
  })
  lastName: string

  @ApiProperty({
    enum: RolePrefix,
    required: true,
    default: RolePrefix.student,
  })
  role: RolePrefix
}

export class SignUpResponseDto {
  @ApiProperty({
    example: '',
  })
  accessToken: string

  @ApiProperty({
    example: '',
  })
  refreshToken: string
}
