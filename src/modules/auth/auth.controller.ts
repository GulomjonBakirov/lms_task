import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { InternalServerErrorResponse, BadRequestResponse, ConflictResponse } from '@swagger'
import { CurrentUser, CurrentUserId, Public } from '@decorators'
import { HttpMessage } from '@enums'
import { RTGuard } from '@guards'
import { LoginDto, SignUpDto, SignUpRequestDto, SignUpResponseDto } from './dto'
import { AuthService } from './auth.service'
import { Tokens } from './type'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // signup
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: SignUpRequestDto,
  })
  @ApiResponse({
    type: SignUpResponseDto,
    status: HttpStatus.CREATED,
    description: HttpMessage.CREATED,
  })
  @ApiResponse({
    type: BadRequestResponse,
    status: HttpStatus.BAD_REQUEST,
    description: HttpMessage.BAD_REQUEST,
  })
  @ApiResponse({
    type: InternalServerErrorResponse,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: HttpMessage.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    type: ConflictResponse,
    status: HttpStatus.CONFLICT,
    description: HttpMessage.CONFLICT,
  })
  signup(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signup(dto)
  }

  // login
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto): Promise<Tokens> {
    return this.authService.login(dto)
  }

  // refresh
  @Public()
  @UseGuards(RTGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@CurrentUserId() userId: string, @CurrentUser('refresh_token') rt: string) {
    return this.authService.refreshTokens(userId, rt)
  }

  // logout
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@CurrentUserId() userId: string) {
    this.authService.logout(userId)
  }
}
