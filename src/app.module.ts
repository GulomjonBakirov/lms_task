import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { HealthModule, AuthModule, UserModule } from '@modules'
import { appConfig, swaggerConfig } from '@configs'
import { ATGuard } from '@guards'

@Module({
  imports: [
    AuthModule,
    UserModule,
    HealthModule,
    ConfigModule.forRoot({
      load: [appConfig, swaggerConfig],
      cache: true,
      isGlobal: true,
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: ATGuard }],
})
export class AppModule {}
