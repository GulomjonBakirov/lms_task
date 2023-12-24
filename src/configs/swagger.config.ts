import { registerAs } from '@nestjs/config'
import type { OpenAPIObject } from '@nestjs/swagger'

export declare interface SwaggerConfig {
  path: string
  options?: Omit<OpenAPIObject, 'paths'>
}

export const swaggerConfig = registerAs(
  'swagger',
  (): SwaggerConfig => ({
    path: '/docs',
    options: {
      openapi: '3.0.0',
      info: {
        title: 'Learning Management System',
        description: 'The LMS API documention',
        version: '1.0.0',
      },
    },
  }),
)
