// import { Observable } from 'rxjs'
// import {
//   Injectable,
//   CallHandler,
//   NestInterceptor,
//   ExecutionContext,
//   ForbiddenException,
//   UnauthorizedException,
// } from '@nestjs/common'
// import { Reflector } from '@nestjs/core'
// import { RpcException } from '@nestjs/microservices'
// import { AccessKeyword } from '@decorators'
// import { UserService } from '@modules'
// import { Role } from '@prisma/client'

// @Injectable()
// export class CheckAccessInterceptor implements NestInterceptor {
//   readonly #_userService: UserService
//   private hasAccess: boolean

//   constructor(
//     userService: UserService,
//     private reflector: Reflector,
//   ) {
//     this.#_userService = userService
//   }

//   async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
//     const rpc = context.switchToRpc()
//     const data = rpc.getData<{ userId?: string; rolePrefix?: string }>()

//     if (!data.userId) {
//       throw new UnauthorizedException('Access tooken not provided')
//     }

//     if (data.rolePrefix != Role.super_admin) {
//       this.hasAccess = false

//       const required_accesses = this.reflector.getAllAndOverride<string>(AccessKeyword, [
//         context.getHandler(),
//         context.getClass(),
//       ])

//       const accesses = await this.#_userService.get_user_access(data.userId)

//       console.log(accesses)

//       for (let i = 0; i < accesses.length; i++) {
//         if (accesses[i].prefix == required_accesses) {
//           this.hasAccess = true
//           break
//         }
//       }
//     } else {
//       this.hasAccess = true
//     }

//     if (!this.hasAccess) {
//       throw new RpcException(new ForbiddenException('You don`t have permissions to this action !'))
//     }

//     return next.handle()
//   }
// }
