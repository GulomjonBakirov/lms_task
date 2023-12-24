import { ApiExcludeController } from '@nestjs/swagger'
import { Get, HttpCode, HttpStatus, Controller } from '@nestjs/common'

@Controller()
@ApiExcludeController()
export class HealthController {
  @HttpCode(HttpStatus.OK)
  @Get('/ping')
  async healthCheck(): Promise<string> {
    return 'pong'
  }
}
