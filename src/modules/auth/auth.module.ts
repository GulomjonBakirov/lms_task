import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from '@clients'
import { ATStrategy, RTStrategy } from './strategies'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, ATStrategy, RTStrategy],
  exports: [AuthService],
})
export class AuthModule {}
