import { RolePrefix } from '@prisma/client'

export interface IUser {
  id: string
  email: string
  firstName: string
  lastName?: string
  role: RolePrefix
  editedAt: Date
  createdAt: Date
}
