import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from '@modules'
import { appConfig, swaggerConfig } from '@configs'

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      load: [appConfig, swaggerConfig],
      cache: true,
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
