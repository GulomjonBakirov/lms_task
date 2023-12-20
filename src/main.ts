import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SwaggerBuilder } from './swagger'

setImmediate(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('/api/v1', {
    exclude: ['/docs', '/ping'],
  })

  const config = app.get(ConfigService)

  // Swagger
  SwaggerBuilder.make(app)

  const host = config.getOrThrow<string>('app.host')
  const port = config.getOrThrow<number>('app.port')

  await app.listen(port, host)
})
