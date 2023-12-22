import { createHmac } from 'crypto'
import { JwtService } from '@nestjs/jwt'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '@clients'
import { IUser } from '@types'
import { Tokens } from './type'
import { LoginDto, SignUpDto } from './dto'

@Injectable()
export class AuthService {
  readonly #_jwt: JwtService
  readonly #_config: ConfigService
  readonly #_prisma: PrismaService

  constructor(prismaService: PrismaService, config: ConfigService, jwt: JwtService) {
    this.#_jwt = jwt
    this.#_config = config
    this.#_prisma = prismaService
  }

  // signup
  async signup(dto: SignUpDto): Promise<Tokens> {
    const hash = this.hashData(dto.password)

    const user = await this.#_prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        hash: hash,
        lastName: dto.lastName,
        role: dto.role,
      },
    })

    const tokens = await this.getTokens(user.id, user.email, user.role)
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token)

    return tokens
  }

  // login
  async login(dto: LoginDto): Promise<Tokens> {
    const user = await this.#_prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    })

    if (!user) throw new ForbiddenException('Invalid Credentials')

    const matchPassword = this.checkPassword(dto.password, user.hash)

    if (!matchPassword) throw new ForbiddenException('Invalid Credentials')

    const tokens = await this.getTokens(user.id, user.email, user.role)
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token)

    return tokens
  }

  // logout
  async logout(userId: string) {
    await this.#_prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    })
  }

  // get Me
  async getMe(userId: string): Promise<IUser> {
    return this.#_prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        editedAt: true,
        createdAt: true,
      },
    })
  }

  // refresh
  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.#_prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) throw new ForbiddenException('Access Denied')

    const matchRT = this.checkPassword(rt, user.hashedRt)
    if (!matchRT) throw new ForbiddenException('Access Denied')

    const tokens = await this.getTokens(user.id, user.email, user.role)
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token)

    return tokens
  }

  hashData(data: string): string {
    const keyAt = this.#_config.get<string>('KEY_HASH')

    console.log('Key At: ', keyAt)
    return createHmac('sha512', keyAt).update(data).digest('hex')
  }

  async getTokens(userId: string, email: string, rolePrefix: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.#_jwt.signAsync(
        {
          sub: userId,
          email,
          rolePrefix,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 60,
        },
      ),
      this.#_jwt.signAsync(
        {
          sub: userId,

          email,
          rolePrefix,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ])

    return { access_token: at, refresh_token: rt }
  }

  async updateRefreshTokenHash(userId: string, rt: string): Promise<void> {
    const hash = this.hashData(rt)

    await this.#_prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    })
  }

  checkPassword(password: string, hashedPassowrd: string) {
    return this.hashData(password) == hashedPassowrd
  }
}
