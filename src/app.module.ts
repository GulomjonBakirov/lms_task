import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { HealthModule, AuthModule, UserModule, GroupModule, ObjectModule, ScheduleModule } from '@modules'
import { appConfig, swaggerConfig } from '@configs'
import { ATGuard } from '@guards'

@Module({
  imports: [
    AuthModule,
    GroupModule,
    UserModule,
    HealthModule,
    ObjectModule,
    ScheduleModule,

    ConfigModule.forRoot({
      load: [appConfig, swaggerConfig],
      cache: true,
      isGlobal: true,
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: ATGuard }],
})
export class AppModule {}
