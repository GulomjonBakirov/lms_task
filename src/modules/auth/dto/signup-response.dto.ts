import { ApiProperty } from '@nestjs/swagger'

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
