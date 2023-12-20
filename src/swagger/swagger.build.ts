import { ConfigService } from '@nestjs/config'
import { SwaggerModule } from '@nestjs/swagger'
import type { INestApplication } from '@nestjs/common'
import type { SwaggerDocumentOptions } from '@nestjs/swagger'
import type { SwaggerConfig } from '@configs'

export class SwaggerBuilder {
  static make(app: INestApplication, documentOptions?: SwaggerDocumentOptions): void {
    const config = app.get(ConfigService)

    const swagger = config.getOrThrow<SwaggerConfig>('swagger')

    const document = SwaggerModule.createDocument(app, swagger.options, documentOptions)

    return SwaggerModule.setup(swagger.path, app, document)
  }
}
