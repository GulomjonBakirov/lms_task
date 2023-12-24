import { IsOptional } from 'class-validator'

export class StudentQueryDto {
  @IsOptional()
  groupId?: string
}
