import { ApiProperty } from '@nestjs/swagger'

export class NoContentResponse {
  @ApiProperty()
  readonly message: string
}

export class BadRequestResponse {
  @ApiProperty()
  readonly message: string
}

export class UnauthorizedResponse {
  @ApiProperty()
  readonly message: string
}

export class ForbiddenResponse {
  @ApiProperty()
  readonly message: string
}

export class NotFoundResponse {
  @ApiProperty()
  readonly message: string
}

export class UnprocessableEntityResponse {
  @ApiProperty()
  readonly message: string

  @ApiProperty()
  readonly details: Record<string, string[]>
}

export class InternalServerErrorResponse {
  @ApiProperty()
  readonly message: string
}
