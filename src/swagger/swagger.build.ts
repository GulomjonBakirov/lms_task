import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import type { INestApplication } from '@nestjs/common'
import type { SwaggerDocumentOptions } from '@nestjs/swagger'
import type { SwaggerConfig } from '@configs'

export class SwaggerBuilder {
  static make(app: INestApplication, documentOptions?: SwaggerDocumentOptions): void {
    const config = app.get(ConfigService)

    const swagger = config.getOrThrow<SwaggerConfig>('swagger')

    const options = new DocumentBuilder()
      .setTitle('Learning Management System')
      .setDescription('The LMS API documention')
      .setVersion('1.0.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'jwt',
      )
      .build()

    const document = SwaggerModule.createDocument(app, options, documentOptions)

    return SwaggerModule.setup(swagger.path, app, document)
  }
}
