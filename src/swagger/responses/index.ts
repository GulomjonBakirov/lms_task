import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { HttpMessage } from '@enums'

export class NoContentResponse {
  @ApiProperty({
    example: HttpStatus.NO_CONTENT,
  })
  readonly statusCode: number
}

export class BadRequestResponse {
  @ApiProperty({
    example: '',
  })
  readonly message: string

  @ApiProperty({
    example: HttpStatus.BAD_REQUEST,
  })
  readonly statusCode: number

  @ApiProperty({
    example: HttpMessage.BAD_REQUEST,
  })
  readonly error: string

  @ApiProperty({
    example: '',
  })
  readonly timestamp: number
}

export class UnauthorizedResponse {
  @ApiProperty({
    example: 'Unauthorized',
  })
  readonly message: string

  @ApiProperty({
    example: HttpStatus.UNAUTHORIZED,
  })
  readonly statusCode: number

  @ApiProperty({
    example: HttpMessage.UNAUTHORIZED,
  })
  readonly error: string

  @ApiProperty({
    example: '',
  })
  readonly timestamp: number
}

export class ForbiddenResponse {
  @ApiProperty({
    example: '',
  })
  readonly message: string

  @ApiProperty({
    example: HttpStatus.FORBIDDEN,
  })
  readonly statusCode: number

  @ApiProperty({
    example: HttpMessage.FORBIDDEN,
  })
  readonly error: string

  @ApiProperty({
    example: '',
  })
  readonly timestamp: number
}

export class NotFoundResponse {
  @ApiProperty({
    example: '',
  })
  readonly message: string

  @ApiProperty({
    example: HttpStatus.NOT_FOUND,
  })
  readonly statusCode: number

  @ApiProperty({
    example: HttpMessage.NOT_FOUND,
  })
  readonly error: string

  @ApiProperty({
    example: '',
  })
  readonly timestamp: number
}

export class InternalServerErrorResponse {
  @ApiProperty({
    example: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  readonly statusCode: number

  @ApiProperty({
    example: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  readonly error: string

  @ApiProperty({
    example: '',
  })
  readonly timestamp: number
}

export class ConflictResponse {
  @ApiProperty({
    example: HttpStatus.CONFLICT,
  })
  readonly statusCode: number

  @ApiProperty({
    example: HttpMessage.CONFLICT,
  })
  readonly error: string

  @ApiProperty({
    example: '',
  })
  readonly timestamp: number
}
