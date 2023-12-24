import {
  ApiBody,
  ApiTags,
  ApiSecurity,
  ApiOkResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger'
import { Get, Body, Post, Controller, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import {
  ConflictResponse,
  ForbiddenResponse,
  BadRequestResponse,
  UnauthorizedResponse,
  InternalServerErrorResponse,
} from '@swagger'
import { Public, CurrentUser, CurrentUserId } from '@decorators'
import { HttpMessage } from '@enums'
import { RTGuard } from '@guards'
import { AuthService } from './auth.service'
import { UserResponseDto } from '../user/dto'
import { LoginDto, SignUpResponseDto } from './dto'
import type { Tokens } from './type'
import type { IUser } from '@types'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // signup
  // @Public()
  // @Post('signup')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiBody({
  //   type: SignUpDto,
  // })
  // @ApiResponse({
  //   type: SignUpResponseDto,
  //   status: HttpStatus.CREATED,
  //   description: HttpMessage.CREATED,
  // })
  // @ApiResponse({
  //   type: BadRequestResponse,
  //   status: HttpStatus.BAD_REQUEST,
  //   description: HttpMessage.BAD_REQUEST,
  // })
  // @ApiResponse({
  //   type: InternalServerErrorResponse,
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: HttpMessage.INTERNAL_SERVER_ERROR,
  // })
  // @ApiResponse({
  //   type: ConflictResponse,
  //   status: HttpStatus.CONFLICT,
  //   description: HttpMessage.CONFLICT,
  // })
  // signup(@Body() dto: SignUpDto): Promise<Tokens> {
  //   return this.authService.signup(dto)
  // }

  // login
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: LoginDto,
  })
  @ApiOkResponse({
    type: SignUpResponseDto,
    description: HttpMessage.OK,
  })
  @ApiForbiddenResponse({
    type: ForbiddenResponse,
    description: HttpMessage.FORBIDDEN,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
    description: HttpMessage.BAD_REQUEST,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
    description: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  @ApiConflictResponse({
    type: ConflictResponse,
    description: HttpMessage.CONFLICT,
  })
  login(@Body() dto: LoginDto): Promise<Tokens> {
    return this.authService.login(dto)
  }

  // refresh
  @Public()
  @UseGuards(RTGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiSecurity('jwt')
  @ApiOkResponse({
    type: SignUpResponseDto,
    description: HttpMessage.OK,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
    description: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  @ApiConflictResponse({
    type: ConflictResponse,
    description: HttpMessage.CONFLICT,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: HttpMessage.UNAUTHORIZED,
  })
  refreshTokens(@CurrentUserId() userId: string, @CurrentUser('refresh_token') rt: string) {
    return this.authService.refreshTokens(userId, rt)
  }

  // logout
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiSecurity('jwt')
  @ApiNoContentResponse()
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
    description: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  @ApiConflictResponse({
    type: ConflictResponse,
    description: HttpMessage.CONFLICT,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: HttpMessage.UNAUTHORIZED,
  })
  logout(@CurrentUserId() userId: string) {
    this.authService.logout(userId)
  }

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @ApiSecurity('jwt')
  @ApiOkResponse({
    type: UserResponseDto,
    description: HttpMessage.OK,
  })
  getMe(@CurrentUserId() userId: string): Promise<IUser> {
    return this.authService.getMe(userId)
  }
}
