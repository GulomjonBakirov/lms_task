import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerBuilder } from './swagger'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './exceptions'

setImmediate(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('/api/v1', {
    exclude: ['/docs', '/ping'],
  })

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalFilters(new HttpExceptionFilter())

  const config = app.get(ConfigService)

  // Swagger
  SwaggerBuilder.make(app)

  const host = config.getOrThrow<string>('app.host')
  const port = config.getOrThrow<number>('app.port')

  await app.listen(port, host)
})
