import { SetMetadata } from '@nestjs/common'
import { Role } from '@enums'

export const RolesKeyword = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(RolesKeyword, roles)
