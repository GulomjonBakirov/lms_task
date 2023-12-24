import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const CurrentUserId = createParamDecorator((data: string | undefined, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()

  return request.user['sub']
})
