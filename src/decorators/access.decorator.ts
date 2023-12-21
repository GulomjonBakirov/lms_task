import { SetMetadata } from '@nestjs/common'
import { Access } from '@enums'

export const AccessKeyword = 'access'
export const AccessDecorator = (access: Access) => SetMetadata(AccessKeyword, access)
