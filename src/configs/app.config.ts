import { registerAs } from '@nestjs/config'

export declare interface AppConfig {
  env?: string
  host?: string
  port?: number
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    env: process.env.NODE_ENV ? String(process.env.NODE_ENV) : undefined,
    host: process.env.APP_HOST ? String(process.env.APP_HOST) : undefined,
    port: process.env.APP_PORT ? Number(process.env.APP_PORT) : undefined,
  }),
)
