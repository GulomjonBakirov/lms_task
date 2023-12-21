import { Catch, HttpException, ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    let errorMessage: string
    let httpStatus: number
    let target: string

    const ctx = host.switchToHttp()

    const response = ctx.getResponse<Response>()

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          httpStatus = 403
          target = exception.message.split(' ')[exception.message.split(' ').length - 1]
          errorMessage = `${target} column is unique`
          break

        default:
          httpStatus = 400
          errorMessage = exception.message
          console.log(exception.code)
          break
      }

      response.status(httpStatus).json({
        statusCode: httpStatus,
        error: errorMessage,
        timestamp: new Date().toISOString(),
      })

      return
    }

    httpStatus = exception.getStatus()
    errorMessage = exception.message
    const content = exception.getResponse()

    if (typeof content === 'object') {
      response.status(httpStatus).json({
        ...content,
        timestamp: new Date().toISOString(),
      })
    } else {
      response.status(httpStatus).json({
        statusCode: httpStatus,
        error: errorMessage,
        timestamp: new Date().toISOString(),
      })
    }
  }
}
