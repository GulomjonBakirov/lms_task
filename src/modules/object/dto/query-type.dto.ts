import { IsEnum, IsNotEmpty } from 'class-validator'
import { AvgType as AvgTypeEnum } from '../enum'
import { ApiProperty } from '@nestjs/swagger'

export const AvgType = {
  group: 'group',
  student: 'student',
}

export class QueryTypeDto {
  @IsEnum(AvgType)
  @IsNotEmpty()
  @ApiProperty({
    enum: AvgType,
    default: AvgTypeEnum.STUDENT,
  })
  type: AvgTypeEnum
}
